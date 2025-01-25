import { Router } from 'express';
import { Request, Response, NextFunction } from 'express';

const router = Router();

router.get('/pizzas', (req, res) => {
  res.json({ message: 'Lista de pizzas' });
});

export { router };