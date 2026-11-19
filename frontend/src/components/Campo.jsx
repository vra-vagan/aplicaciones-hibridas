function Campo({label, name, id = name, error, hint, obligatorio = false, as: Elemento = 'input', children, ...props}) {
    const clases = ['contacto__input'];
    if (Elemento === 'textarea') clases.push('contacto__textarea');
    if (error) clases.push('contacto__input--error');

    return (
        <div className="contacto__campo">
            <label className="contacto__label" htmlFor={id}>
                {label} {obligatorio && <span className="contacto__obligatorio">*</span>}
            </label>
            <Elemento className={clases.join(' ')} id={id} name={name} aria-invalid={Boolean(error)} {...props}>
                {children}
            </Elemento>
            {hint && <p className="contacto__hint">{hint}</p>}
            {error && <p className="contacto__error">{error}</p>}
        </div>
    )
}

export default Campo
