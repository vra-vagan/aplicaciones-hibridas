import authRouter from './authRouter.js';
import empleadorRouter from './empleadorRouter.js';
import vacanteRouter from './vacanteRouter.js';
import userRouter from './userRouter.js';
import postulacionRouter from './postulacionRouter.js';

const routerAPI = (app) => {
    app.use('/api/auth', authRouter);
    app.use('/api/empleadores', empleadorRouter);
    app.use('/api/vacantes', vacanteRouter);
    app.use('/api/users', userRouter);
    app.use('/api/postulaciones', postulacionRouter);
};

export default routerAPI;
