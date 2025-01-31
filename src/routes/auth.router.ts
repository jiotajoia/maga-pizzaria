import { Router } from 'express';
import { Request, Response } from 'express';

const authRouter = Router();

authRouter.get('/login', (req: Request, res: Response) => {
  res.render("login", { title: 'Login', bodyClass: 'style/style'});
});

authRouter.get('/registerClient', (req: Request, res: Response) => {
  res.render("registerClient", { title: 'Cadastro de Cliente', bodyClass: 'style/style'});
});

export { authRouter };