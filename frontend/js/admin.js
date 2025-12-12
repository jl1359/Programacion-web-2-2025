const API = 'https://localhost:5000/api';
const headers = { 
    'Content-Type': 'application/json', 
    'Authorization': `Bearer ${localStorage.getItem('token')}` 
};

// --- PESTAÑAS ---
function cambiarTab(tabName) {
    // 1. Gestión visual de tabs
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    
    const tabBtn = document.querySelector(`.tab[onclick="cambiarTab('${tabName}')"]`);
    if(tabBtn) tabBtn.classList.add('active');
    
    const content = document.getElementById(`tab-${tabName}`);
    if(content) content.classList.add('active');

    // 2. Cargar datos específicos
    if(tabName === 'usuarios') cargarUsuarios();
    if(tabName === 'categorias') cargarCategorias();
    if(tabName === 'subcategorias') { cargarSubcategorias(); cargarSelectCategorias(); }
    if(tabName === 'dificultades') cargarDificultades();
    if(tabName === 'rangos') cargarRangos();
}

// ==========================================
// 1. USUARIOS
// ==========================================
async function cargarUsuarios() {
    try {
        const res = await fetch(`${API}/usuarios`, { headers });
        const data = await res.json();
        const tbody = document.getElementById('tabla-usuarios');
        tbody.innerHTML = '';
        
        (data.usuarios || []).forEach(u => {
            tbody.innerHTML += `
                <tr>
                    <td>${u.nombre}</td>
                    <td>${u.correo}</td>
                    <td><span class="badge">${u.rol}</span></td>
                    <td>${u.rol === 'estudiante' ? `<button onclick="hacerProfesor('${u._id}')" class="btn-secondary" style="padding:5px; font-size:0.8rem">Ascender</button>` : '-'}</td>
                </tr>`;
        });
    } catch(e) { console.error(e); }
}

async function hacerProfesor(id) {
    if(confirm('¿Ascender a Profesor?')) {
        await fetch(`${API}/usuarios/${id}/hacer-profesor`, { method: 'PUT', headers });
        cargarUsuarios();
    }
}

// ==========================================
// 2. CATEGORÍAS
// ==========================================
async function cargarCategorias() {
    const res = await fetch(`${API}/categorias`, { headers });
    const data = await res.json();
    const tbody = document.getElementById('tabla-categorias');
    tbody.innerHTML = '';
    
    (data.data || []).forEach(c => {
        tbody.innerHTML += `
            <tr>
                <td>${c.nombre}</td>
                <td>${c.descripcion || ''}</td>
                <td><button onclick="borrarGenerico('/categorias', '${c._id}', cargarCategorias)" class="btn-danger" style="padding:5px; width:auto;">Borrar</button></td>
            </tr>`;
    });
}

async function crearCategoria(e) {
    e.preventDefault();
    const nombre = document.getElementById('cat-nombre').value;
    const descripcion = document.getElementById('cat-desc').value;
    await fetch(`${API}/categorias`, { method: 'POST', headers, body: JSON.stringify({ nombre, descripcion }) });
    e.target.reset();
    cargarCategorias();
}

// ==========================================
// 3. SUBCATEGORÍAS
// ==========================================
async function cargarSubcategorias() {
    const res = await fetch(`${API}/subcategorias`, { headers });
    const data = await res.json();
    const tbody = document.getElementById('tabla-subcategorias');
    tbody.innerHTML = '';

    (data.data || []).forEach(sc => {
        // sc.categoria puede venir populado (objeto) o solo ID. Manejamos ambos.
        const nombreCat = sc.categoria ? (sc.categoria.nombre || 'Sin Cat') : 'Sin Cat';
        tbody.innerHTML += `
            <tr>
                <td>${sc.nombre}</td>
                <td>${nombreCat}</td>
                <td><button onclick="borrarGenerico('/subcategorias', '${sc._id}', cargarSubcategorias)" class="btn-danger" style="padding:5px; width:auto;">Borrar</button></td>
            </tr>`;
    });
}

// Llenar el select del formulario de creación
async function cargarSelectCategorias() {
    const res = await fetch(`${API}/categorias`, { headers });
    const data = await res.json();
    const select = document.getElementById('sub-cat-padre');
    select.innerHTML = '<option value="">Selecciona Categoría Padre...</option>';
    (data.data || []).forEach(c => {
        select.innerHTML += `<option value="${c._id}">${c.nombre}</option>`;
    });
}

async function crearSubcategoria(e) {
    e.preventDefault();
    const categoria = document.getElementById('sub-cat-padre').value;
    const nombre = document.getElementById('sub-nombre').value;
    const descripcion = document.getElementById('sub-desc').value;

    if(!categoria) return alert("Debes seleccionar una categoría padre");

    await fetch(`${API}/subcategorias`, { method: 'POST', headers, body: JSON.stringify({ nombre, descripcion, categoria }) });
    e.target.reset();
    cargarSubcategorias();
}

// ==========================================
// 4. DIFICULTADES
// ==========================================
async function cargarDificultades() {
    const res = await fetch(`${API}/dificultades`, { headers });
    const data = await res.json();
    const tbody = document.getElementById('tabla-dificultades');
    tbody.innerHTML = '';

    (data.data || []).forEach(d => {
        tbody.innerHTML += `<tr><td>${d.nombre}</td><td>${d.orden}</td><td><button onclick="borrarGenerico('/dificultades', '${d._id}', cargarDificultades)" class="btn-danger" style="padding:5px; width:auto;">Borrar</button></td></tr>`;
    });
}

async function crearDificultad(e) {
    e.preventDefault();
    const nombre = document.getElementById('dif-nombre').value;
    const orden = document.getElementById('dif-orden').value;
    await fetch(`${API}/dificultades`, { method: 'POST', headers, body: JSON.stringify({ nombre, orden }) });
    e.target.reset();
    cargarDificultades();
}

// ==========================================
// 5. RANGOS DE EDAD
// ==========================================
async function cargarRangos() {
    const res = await fetch(`${API}/rangos-edad`, { headers });
    const data = await res.json();
    const tbody = document.getElementById('tabla-rangos');
    tbody.innerHTML = '';

    (data.data || []).forEach(r => {
        tbody.innerHTML += `<tr><td>${r.nombre}</td><td>${r.edadMin}</td><td>${r.edadMax}</td><td><button onclick="borrarGenerico('/rangos-edad', '${r._id}', cargarRangos)" class="btn-danger" style="padding:5px; width:auto;">Borrar</button></td></tr>`;
    });
}

async function crearRango(e) {
    e.preventDefault();
    const nombre = document.getElementById('ran-nombre').value;
    const edadMin = document.getElementById('ran-min').value;
    const edadMax = document.getElementById('ran-max').value;
    await fetch(`${API}/rangos-edad`, { method: 'POST', headers, body: JSON.stringify({ nombre, edadMin, edadMax }) });
    e.target.reset();
    cargarRangos();
}

// ==========================================
// UTILIDAD GENÉRICA
// ==========================================
async function borrarGenerico(endpoint, id, callbackRecarga) {
    if(confirm('¿Estás seguro de eliminar este elemento?')) {
        await fetch(`${API}${endpoint}/${id}`, { method: 'DELETE', headers });
        callbackRecarga();
    }
}

// INICIALIZACIÓN
// Exponer funciones al window para que el HTML las vea
window.cambiarTab = cambiarTab;
window.hacerProfesor = hacerProfesor;
window.crearCategoria = crearCategoria;
window.crearSubcategoria = crearSubcategoria;
window.crearDificultad = crearDificultad;
window.crearRango = crearRango;
window.borrarGenerico = borrarGenerico;

document.addEventListener('DOMContentLoaded', () => cargarUsuarios());