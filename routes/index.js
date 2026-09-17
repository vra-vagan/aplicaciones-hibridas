import empleadorRouter from './empleadorRouter.js';
import vacanteRouter from './vacanteRouter.js';
import userRouter from './userRouter.js';

const routerAPI = (app) => {
    app.use('/api/empleadores', empleadorRouter);
    app.use('/api/vacantes', vacanteRouter);
    app.use('/api/users', userRouter);
};

export default routerAPI;
