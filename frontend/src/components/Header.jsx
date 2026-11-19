import Logo from './Logo.jsx'
import Nav from './Nav.jsx'

function Header() {
    return (
        <header className="header">
            <div className="container">
                <Logo/>
                <Nav/>
            </div>
        </header>
    )
}

export default Header
