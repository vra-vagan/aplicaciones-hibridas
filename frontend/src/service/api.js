const API_URL = import.meta.env.VITE_API_URL;

class ErrorApi extends Error {
    constructor(message, status = 0, detalles = []) {
        super(message);
        this.status = status;
        this.detalles = detalles;
    }
}

export function urlImagen(ruta) {
    if (!ruta) return '';
    return /^https?:\/\//.test(ruta) ? ruta : `${API_URL}${ruta}`;
}

export function armarQuery(params = {}) {
    const query = new URLSearchParams();

    Object.entries(params).forEach(([clave, valor]) => {
        if (valor === undefined || valor === null || valor === '') return;
        if (Array.isArray(valor)) {
            if (valor.length) query.set(clave, valor.join(','));
            return;
        }
        query.set(clave, valor);
    });

    const texto = query.toString();
    return texto ? `?${texto}` : '';
}

async function pedir(endpoint, options = {}, token = null) {
    const headers = new Headers(options.headers || {});

    if (options.body) headers.set('Content-Type', 'application/json');
    if (token) headers.set('Authorization', `Bearer ${token}`);

    let response;
    try {
        response = await fetch(`${API_URL}${endpoint}`, {...options, headers});
    } catch {
        throw new ErrorApi('No se pudo conectar con el servidor. ¿Está levantado el backend?');
    }

    const data = await response.json().catch(() => null);

    if (response.status === 401 && token) {
        window.dispatchEvent(new Event('sesion-expirada'));
        throw new ErrorApi('La sesión es inválida o expiró. Volvé a iniciar sesión.', 401);
    }

    if (!response.ok) {
        throw new ErrorApi(data?.message || 'Error del servidor', response.status, data?.detalles || []);
    }

    return data;
}

export function fetchPublico(endpoint, options = {}) {
    return pedir(endpoint, options);
}

export function fetchPrivado(endpoint, options = {}) {
    const token = sessionStorage.getItem('token');

    if (!token) {
        return Promise.reject(new ErrorApi('No existe una sesión activa', 401));
    }

    return pedir(endpoint, options, token);
}
