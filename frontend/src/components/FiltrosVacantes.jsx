function FiltrosVacantes({grupos, seleccion, onCambiar, onRestablecer}) {
    const hayFiltros = grupos.some((grupo) => seleccion[grupo.campo]?.length);

    function alternar(campo, valor) {
        const actuales = seleccion[campo] || [];
        const nuevos = actuales.includes(valor)
            ? actuales.filter((v) => v !== valor)
            : [...actuales, valor];
        onCambiar(campo, nuevos);
    }

    return (
        <aside className="vacantes__aside">
            {grupos.map((grupo) => (
                <div className="aside__grupo" key={grupo.campo}>
                    <p className="aside__titulo">{grupo.titulo}</p>
                    <div className="aside__opciones">
                        {Object.entries(grupo.opciones).map(([valor, etiqueta]) => (
                            <label className="aside__opcion" key={valor}>
                                <input
                                    type="checkbox"
                                    checked={(seleccion[grupo.campo] || []).includes(valor)}
                                    onChange={() => alternar(grupo.campo, valor)}
                                />
                                <span>{etiqueta}</span>
                            </label>
                        ))}
                    </div>
                </div>
            ))}
            {hayFiltros && (
                <button type="button" className="btn-link aside__restablecer" onClick={onRestablecer}>
                    Restablecer filtros
                </button>
            )}
        </aside>
    )
}

export default FiltrosVacantes
