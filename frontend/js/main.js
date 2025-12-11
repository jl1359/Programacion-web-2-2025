const API_URL = 'https://localhost:5000/api/inicio';
const mensajeDiv = document.getElementById('mensaje');

function mostrarMensaje(texto, tipo) {
    if (!mensajeDiv) return;
    
    if (!texto) {
        mensajeDiv.classList.add('hidden');
        mensajeDiv.className = 'mensaje-box hidden';
        return;
    }
    mensajeDiv.textContent = texto;
    mensajeDiv.className = `mensaje-box ${tipo}`;
    mensajeDiv.classList.remove('hidden');
}
const formLogin = document.getElementById('form-login');

if (formLogin) {
    formLogin.addEventListener('submit', async (e) => {
        e.preventDefault();
        mostrarMensaje('Proceso', 'success');

        const correo = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ correo, password })
            });

            const data = await response.json();

            if (response.ok) {
                mostrarMensaje('¡Login exitoso! Redirigiendo a', 'success');
                
                localStorage.setItem('token', data.token);
                localStorage.setItem('usuario', JSON.stringify(data.usuario));
                
                const rol = data.usuario.rol;
                
                setTimeout(() => {
                    if (rol === 'administrador') {
                        window.location.href = 'perfil-admin.html';
                    } else if (rol === 'profesor') {
                        window.location.href = 'perfil-profesor.html';
                    } else {
                        window.location.href = 'perfil.html';
                    }
                }, 1000);

            } else {
                mostrarMensaje(data.message || 'Error al iniciar sesion', 'error');
            }
        } catch (error) {
            console.error(error);
            mostrarMensaje('Error de conexion (Revisa https://localhost:5000)', 'error');
        }
    });
}

const formRegister = document.getElementById('form-register');

if (formRegister) {
    formRegister.addEventListener('submit', async (e) => {
        e.preventDefault();
        mostrarMensaje('Creando cuenta...', 'success');

        const nombre = document.getElementById('reg-nombre').value;
        const correo = document.getElementById('reg-email').value;
        const password = document.getElementById('reg-password').value;

        try {
            const response = await fetch(`${API_URL}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nombre, correo, password })
            });

            const data = await response.json();

            if (response.ok || response.status === 201) {
                mostrarMensaje('Cuenta creada', 'success');
                localStorage.setItem('token', data.token);
                localStorage.setItem('usuario', JSON.stringify(data.usuario));

                setTimeout(() => {
                    alert('Registro completado.Por favor inicia sesion.');
                    window.location.href = 'index.html'; 
                }, 1500);

            } else {
                mostrarMensaje(data.message || 'Error al registrarse', 'error');
            }
        } catch (error) {
            console.error(error);
            mostrarMensaje('Error de conexion con el servidor', 'error');
        }
    });
}

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    window.location.href = 'index.html';
}

function verificarAcceso(rolRequerido) {
    const usuarioGuardado = localStorage.getItem('usuario');
    const token = localStorage.getItem('token');

    if (!usuarioGuardado || !token) {
        alert('Debes iniciar sesion primero');
        window.location.href = 'index.html';
        return;
    }

    const usuario = JSON.parse(usuarioGuardado);
    if (rolRequerido && usuario.rol !== rolRequerido && usuario.rol !== 'administrador') {
        alert('No tienes permiso para ver esta pagina');
        
        if (usuario.rol === 'profesor') window.location.href = 'perfil-profesor.html';
        else if (usuario.rol === 'estudiante') window.location.href = 'perfil.html';
        else if (usuario.rol === 'administrador') window.location.href = 'perfil-admin.html';
    }
}