import { Router } from 'express';
import { Request, Response } from 'express';

const pizzaRouter = Router();

pizzaRouter.get('/', (req: Request, res: Response) => {
  res.render("maga", { title: '', bodyClass: 'style/style'});
});

pizzaRouter.get('/pizzas', (req: Request, res: Response) => {
  res.render("pizzas", { title: 'Catálogo de Pizzas', bodyClass: 'style/style'});
});

pizzaRouter.post('/pizzas', (req: Request, res: Response) => {
  res.render("pizzas", { title: 'Catálogo de Pizzas', bodyClass: 'style/style'});
});

pizzaRouter.get('/about', (req: Request, res: Response) => {
  res.render("about", { title: 'Sobre a Maga Pizzaria', bodyClass: 'style/style'});
});

export { pizzaRouter };