function Aviso({tipo = 'info', children}) {
    if (!children) return null;

    return <p className={`contacto__aviso contacto__aviso--${tipo}`}>{children}</p>
}

export default Aviso
