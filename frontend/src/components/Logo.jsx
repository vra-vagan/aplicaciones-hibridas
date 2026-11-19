import {Link} from 'react-router-dom'

function Logo() {
    return (
        <Link to="/" className="logo">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.0291 28C12.7923 21.5095 17.0513 15.2454 23.5417 14.0087C24.7785 20.4991 20.5195 26.7632 14.0291 28Z" fill="#0578FF"/>
                <path d="M4.45827 13.9913C3.22151 7.50088 7.48048 1.23674 13.971 0C15.2077 6.49047 10.9487 12.7546 4.45827 13.9913Z" fill="#0578FF"/>
                <path d="M14.0088 4.45837C15.2455 10.9488 21.5096 15.2078 28.0001 13.9711C26.7634 7.48058 20.4992 3.22161 14.0088 4.45837Z" fill="#0578FF"/>
                <path d="M0 14.0289C1.23674 20.5194 7.50089 24.7784 13.9913 23.5416C12.7546 17.0512 6.49047 12.7922 0 14.0289Z" fill="#0578FF"/>
            </svg>
            <span>Cazatalentos</span>
        </Link>
    )
}

export default Logo
