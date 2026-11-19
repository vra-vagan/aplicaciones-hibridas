export const regexInsensible = (texto) => new RegExp(texto.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
