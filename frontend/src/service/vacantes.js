import {fetchPublico, fetchPrivado, armarQuery} from './api.js';

export function obtenerVacantes(filtros = {}) {
    return fetchPublico(`/api/vacantes${armarQuery(filtros)}`);
}

export function obtenerVacante(id) {
    return fetchPublico(`/api/vacantes/${id}`);
}

export function crearVacante(datos) {
    return fetchPrivado('/api/vacantes', {method: 'POST', body: JSON.stringify(datos)});
}

export function actualizarVacante(id, datos) {
    return fetchPrivado(`/api/vacantes/${id}`, {method: 'PUT', body: JSON.stringify(datos)});
}

export function eliminarVacante(id) {
    return fetchPrivado(`/api/vacantes/${id}`, {method: 'DELETE'});
}
