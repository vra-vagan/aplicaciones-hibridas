import {useState, useEffect} from 'react'

export function useFetch(funcion, dependencias = []) {
    const [data, setData] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let activo = true;
        setCargando(true);
        setError('');

        funcion()
            .then((respuesta) => {
                if (activo) setData(respuesta.data);
            })
            .catch((err) => {
                if (activo) setError(err.message);
            })
            .finally(() => {
                if (activo) setCargando(false);
            });

        return () => {
            activo = false;
        };
    }, dependencias);

    return {data, setData, cargando, error};
}
