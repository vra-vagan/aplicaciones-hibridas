import 'dotenv/config';
import express from 'express';
import conectarDB from './config/db.js';
import routerAPI from './routes/index.js';
import {rutaNoEncontrada, manejarErrores} from './middlewares/errores.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

routerAPI(app);

app.use(rutaNoEncontrada);
app.use(manejarErrores);

conectarDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor escuchando en http://localhost:${PORT}`);
    });
});
