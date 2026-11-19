import {fetchPublico} from './api.js';

export function iniciarSesion(email, password) {
    return fetchPublico('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({email, password})
    });
}

export function registrarUsuario(datos) {
    return fetchPublico('/api/auth/register', {
        method: 'POST',
        body: JSON.stringify(datos)
    });
}
