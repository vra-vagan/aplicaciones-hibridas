export function formatearSalario(salario) {
    return `$\u00a0${Number(salario || 0).toLocaleString('es-AR', {maximumFractionDigits: 0})}`;
}

export function formatearFecha(fecha) {
    if (!fecha) return '';
    return new Date(fecha).toLocaleDateString('es-AR', {day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'UTC'});
}

export function haceDias(fecha) {
    const dias = Math.max(0, Math.floor((Date.now() - new Date(fecha).getTime()) / 86400000));
    if (dias === 0) return 'Hoy';
    return `Hace ${dias} ${dias === 1 ? 'día' : 'días'}`;
}

export function dominio(url) {
    return (url || '').replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/$/, '');
}

export function fechaInput(fecha) {
    return fecha ? new Date(fecha).toISOString().slice(0, 10) : '';
}
