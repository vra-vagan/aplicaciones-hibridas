import {useState, useEffect} from 'react'

function Buscador({valor, onBuscar, placeholder}) {
    const [texto, setTexto] = useState(valor);

    useEffect(() => {
        setTexto(valor);
    }, [valor]);

    function handleSubmit(evento) {
        evento.preventDefault();
        onBuscar(texto.trim());
    }

    return (
        <form className="busqueda" onSubmit={handleSubmit}>
            <div className="busqueda__inner">
                <input
                    className="busqueda__input"
                    type="text"
                    placeholder={placeholder}
                    value={texto}
                    onChange={(evento) => setTexto(evento.target.value)}
                />
                <button type="submit" className="btn">Buscar</button>
                {valor && (
                    <button type="button" className="btn btn--secundario" onClick={() => onBuscar('')}>Limpiar</button>
                )}
            </div>
        </form>
    )
}

export default Buscador
