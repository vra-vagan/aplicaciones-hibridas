import {fetchPublico, fetchPrivado} from './api.js';

export function obtenerEmpleadores() {
    return fetchPublico('/api/empleadores');
}

export function obtenerEmpleador(id) {
    return fetchPublico(`/api/empleadores/${id}`);
}

export function crearEmpleador(datos) {
    return fetchPrivado('/api/empleadores', {method: 'POST', body: JSON.stringify(datos)});
}

export function actualizarEmpleador(id, datos) {
    return fetchPrivado(`/api/empleadores/${id}`, {method: 'PUT', body: JSON.stringify(datos)});
}

export function eliminarEmpleador(id) {
    return fetchPrivado(`/api/empleadores/${id}`, {method: 'DELETE'});
}
