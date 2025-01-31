import { Router } from 'express';
import { authRouter } from './auth.router';
import { pizzaRouter } from './pizza.router';

const router = Router();

router.use(authRouter);

router.use(pizzaRouter);

export { router };