// frontend/js/profesor.js
const API = 'https://localhost:5000/api';
const headers = { 
    'Content-Type': 'application/json', 
    'Authorization': `Bearer ${localStorage.getItem('token')}` 
};

// --- 1. CARGA DE COMBOS (Selects) ---
async function cargarCatalogos() {
    try {
        // Categorías
        const resCat = await fetch(`${API}/categorias`, { headers });
        const dataCat = await resCat.json();
        llenarSelect('categoria', dataCat.data);

        // Dificultades
        const resDif = await fetch(`${API}/dificultades`, { headers });
        const dataDif = await resDif.json();
        llenarSelect('dificultad', dataDif.data);

        // Rangos de Edad
        const resRan = await fetch(`${API}/rangos-edad`, { headers });
        const dataRan = await resRan.json();
        llenarSelect('rangoEdad', dataRan.data);

    } catch (e) { console.error('Error cargando listas', e); }
}

async function cargarSubcategorias() {
    const catId = document.getElementById('categoria').value;
    const subSelect = document.getElementById('subcategoria');
    
    if(!catId) {
        subSelect.innerHTML = '<option value="">Elige categoría...</option>';
        subSelect.disabled = true;
        return;
    }

    try {
        const res = await fetch(`${API}/subcategorias?categoria=${catId}`, { headers });
        const data = await res.json();
        
        subSelect.innerHTML = '<option value="">Seleccione...</option>';
        if(data.data && data.data.length > 0) {
            data.data.forEach(item => {
                subSelect.innerHTML += `<option value="${item._id}">${item.nombre}</option>`;
            });
            subSelect.disabled = false;
        } else {
            subSelect.innerHTML = '<option value="">Sin subcategorías</option>';
        }
    } catch(e) { console.error(e); }
}

function llenarSelect(id, datos) {
    const select = document.getElementById(id);
    select.innerHTML = '<option value="">Seleccione...</option>';
    if(Array.isArray(datos)) {
        datos.forEach(item => {
            select.innerHTML += `<option value="${item._id}">${item.nombre}</option>`;
        });
    }
}

// --- 2. GESTIÓN CUESTIONARIOS ---

// Listar
async function listarCuestionarios() {
    const contenedor = document.getElementById('lista-cuestionarios');
    contenedor.innerHTML = '<p>Cargando...</p>';

    try {
        const res = await fetch(`${API}/cuestionario`, { headers });
        const lista = await res.json();

        if(!lista || lista.length === 0) {
            contenedor.innerHTML = '<p style="text-align:center; color:#888;">No has creado cuestionarios aún.</p>';
            return;
        }

        contenedor.innerHTML = lista.map(c => {
            const esBorrador = c.estado === 'BORRADOR';
            return `
            <div class="card" style="margin-bottom: 15px; border-left: 5px solid ${esBorrador ? '#ffc107' : '#28a745'};">
                <div>
                    <h4 style="margin:0;">${c.titulo}</h4>
                    <small style="color:#666;">${c.categoria?.nombre || '-'} | ${c.dificultad?.nombre || '-'}</small>
                </div>
                <div style="text-align:right;">
                    <span class="badge" style="background:${esBorrador ? '#fff3cd' : '#d4edda'}; color:${esBorrador ? '#856404' : '#155724'}">
                        ${c.estado}
                    </span>
                    <div style="margin-top:5px;">
                        ${esBorrador 
                            ? `<button onclick="cambiarEstado('${c._id}', 'PUBLICADO')" style="cursor:pointer; border:1px solid #28a745; background:white; color:#28a745; border-radius:4px;">🚀 Publicar</button>` 
                            : `<button onclick="cambiarEstado('${c._id}', 'BORRADOR')" style="cursor:pointer; border:1px solid #666; background:white; color:#666; border-radius:4px;">🔒 Ocultar</button>`
                        }
                        <button onclick="eliminar('${c._id}')" style="cursor:pointer; border:1px solid #dc3545; background:white; color:#dc3545; border-radius:4px; margin-left:5px;">🗑</button>
                    </div>
                </div>
            </div>
            `;
        }).join('');

    } catch (e) {
        console.error(e);
        contenedor.innerHTML = '<p class="error">Error al cargar cuestionarios.</p>';
    }
}

// Crear
document.getElementById('form-crear').addEventListener('submit', async (e) => {
    e.preventDefault();
    const payload = {
        titulo: document.getElementById('titulo').value,
        descripcion: document.getElementById('descripcion').value,
        categoria: document.getElementById('categoria').value,
        subcategoria: document.getElementById('subcategoria').value,
        dificultad: document.getElementById('dificultad').value,
        rangoEdad: document.getElementById('rangoEdad').value
    };

    try {
        const res = await fetch(`${API}/cuestionario`, {
            method: 'POST',
            headers,
            body: JSON.stringify(payload)
        });

        if(res.ok) {
            document.getElementById('form-crear').reset();
            document.getElementById('subcategoria').disabled = true;
            listarCuestionarios();
            alert('Cuestionario creado exitosamente.');
        } else {
            const err = await res.json();
            alert('Error: ' + err.message);
        }
    } catch(e) { console.error(e); alert('Error de conexión'); }
});

// Cambiar Estado (Publicar/Ocultar)
async function cambiarEstado(id, nuevoEstado) {
    try {
        const res = await fetch(`${API}/cuestionario/${id}`, {
            method: 'PUT',
            headers,
            body: JSON.stringify({ estado: nuevoEstado })
        });
        if(res.ok) listarCuestionarios();
        else alert('No se pudo cambiar el estado (Verifica ruta PUT en backend)');
    } catch(e) { console.error(e); }
}

// Eliminar
async function eliminar(id) {
    if(!confirm('¿Eliminar cuestionario permanentemente?')) return;
    try {
        const res = await fetch(`${API}/cuestionario/${id}`, { method: 'DELETE', headers });
        if(res.ok) listarCuestionarios();
    } catch(e) { console.error(e); }
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    cargarCatalogos();
    listarCuestionarios();
});

// Exportar funciones globales para usar en el HTML (onclick)
window.cargarSubcategorias = cargarSubcategorias;
window.cambiarEstado = cambiarEstado;
window.eliminar = eliminar;
window.listarCuestionarios = listarCuestionarios;