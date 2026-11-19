import 'dotenv/config';
import mongoose from 'mongoose';
import {readFile} from 'node:fs/promises';
import Empleador from '../models/Empleador.js';
import Vacante from '../models/Vacante.js';
import User from '../models/User.js';
import Postulacion from '../models/Postulacion.js';

const leerJSON = async (archivo) => JSON.parse(await readFile(new URL(`./data/${archivo}`, import.meta.url), 'utf-8'));

try {
    await mongoose.connect(process.env.MONGODB_URI);

    await Promise.all([Empleador.deleteMany(), Vacante.deleteMany(), User.deleteMany(), Postulacion.deleteMany()]);

    const empleadores = await Empleador.insertMany(await leerJSON('empleadores.json'));
    const idEmpleador = new Map(empleadores.map((e) => [e.nombre, e._id]));

    const vacantes = await Vacante.insertMany(
        (await leerJSON('vacantes.json')).map((v) => ({...v, empleador: idEmpleador.get(v.empleador)}))
    );
    const idVacante = new Map(vacantes.map((v) => [v.titulo, v._id]));

    const users = await User.create(await leerJSON('users.json'));
    const idUser = new Map(users.map((u) => [u.email, u._id]));

    const postulaciones = await Postulacion.insertMany(
        (await leerJSON('postulaciones.json')).map((p) => ({
            ...p,
            usuario: idUser.get(p.usuario),
            vacante: idVacante.get(p.vacante)
        }))
    );

    console.log(
        `Base de datos cargada: ${empleadores.length} empleadores, ${vacantes.length} vacantes, ` +
        `${users.length} usuarios, ${postulaciones.length} postulaciones`
    );
} catch (error) {
    console.error('Error al cargar los datos:', error.message);
    process.exitCode = 1;
} finally {
    await mongoose.disconnect();
}
