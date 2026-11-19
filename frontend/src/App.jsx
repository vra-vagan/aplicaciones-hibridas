import {Routes, Route} from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import ScrollArriba from './components/ScrollArriba.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import RoleRoute from './components/RoleRoute.jsx'
import Home from './pages/Home.jsx'
import Vacantes from './pages/Vacantes.jsx'
import VacanteDetalle from './pages/VacanteDetalle.jsx'
import Empresas from './pages/Empresas.jsx'
import EmpresaDetalle from './pages/EmpresaDetalle.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Perfil from './pages/Perfil.jsx'
import Admin from './pages/Admin.jsx'
import VacanteEditor from './pages/VacanteEditor.jsx'
import EmpresaEditor from './pages/EmpresaEditor.jsx'
import AccesoDenegado from './pages/AccesoDenegado.jsx'
import NotFound from './pages/NotFound.jsx'

function App() {
    return (
        <>
            <ScrollArriba/>
            <Header/>

            <main className="main">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/vacantes" element={<Vacantes/>}/>
                    <Route path="/vacantes/:id" element={<VacanteDetalle/>}/>
                    <Route path="/empresas" element={<Empresas/>}/>
                    <Route path="/empresas/:id" element={<EmpresaDetalle/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>

                    <Route element={<ProtectedRoute/>}>
                        <Route path="/perfil" element={<Perfil/>}/>

                        <Route element={<RoleRoute rolesPermitidos={['admin']}/>}>
                            <Route path="/admin" element={<Admin/>}/>
                            <Route path="/admin/vacantes/nueva" element={<VacanteEditor/>}/>
                            <Route path="/admin/vacantes/:id/editar" element={<VacanteEditor/>}/>
                            <Route path="/admin/empresas/nueva" element={<EmpresaEditor/>}/>
                            <Route path="/admin/empresas/:id/editar" element={<EmpresaEditor/>}/>
                        </Route>
                    </Route>

                    <Route path="/acceso-denegado" element={<AccesoDenegado/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </main>

            <Footer/>
        </>
    )
}

export default App
