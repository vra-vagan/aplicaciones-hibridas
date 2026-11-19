import {useSearchParams} from 'react-router-dom'

export function useFiltrosUrl() {
    const [params, setParams] = useSearchParams();

    const lista = (campo) => (params.get(campo) || '').split(',').filter(Boolean);

    const texto = (campo) => params.get(campo) || '';

    function cambiar(campo, valor) {
        setParams((actuales) => {
            const nuevos = new URLSearchParams(actuales);
            const limpio = Array.isArray(valor) ? valor.join(',') : valor;
            if (limpio) nuevos.set(campo, limpio);
            else nuevos.delete(campo);
            return nuevos;
        }, {replace: true});
    }

    function limpiar(campos) {
        setParams((actuales) => {
            const nuevos = new URLSearchParams(actuales);
            campos.forEach((campo) => nuevos.delete(campo));
            return nuevos;
        }, {replace: true});
    }

    return {lista, texto, cambiar, limpiar, clave: params.toString()};
}
