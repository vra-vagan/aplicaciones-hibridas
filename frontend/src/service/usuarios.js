import {fetchPrivado} from './api.js';

export function obtenerPerfil() {
    return fetchPrivado('/api/users/me');
}

export function actualizarPerfil(datos) {
    return fetchPrivado('/api/users/me', {method: 'PUT', body: JSON.stringify(datos)});
}

export function obtenerUsuarios() {
    return fetchPrivado('/api/users');
}

export function actualizarUsuario(id, datos) {
    return fetchPrivado(`/api/users/${id}`, {method: 'PUT', body: JSON.stringify(datos)});
}

export function eliminarUsuario(id) {
    return fetchPrivado(`/api/users/${id}`, {method: 'DELETE'});
}
