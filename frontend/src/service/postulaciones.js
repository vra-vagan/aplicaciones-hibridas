import {fetchPrivado, armarQuery} from './api.js';

export function obtenerPostulaciones(filtros = {}) {
    return fetchPrivado(`/api/postulaciones${armarQuery(filtros)}`);
}

export function crearPostulacion(datos) {
    return fetchPrivado('/api/postulaciones', {method: 'POST', body: JSON.stringify(datos)});
}

export function actualizarPostulacion(id, datos) {
    return fetchPrivado(`/api/postulaciones/${id}`, {method: 'PUT', body: JSON.stringify(datos)});
}

export function eliminarPostulacion(id) {
    return fetchPrivado(`/api/postulaciones/${id}`, {method: 'DELETE'});
}
