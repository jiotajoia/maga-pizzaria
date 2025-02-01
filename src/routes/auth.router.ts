import { Router } from 'express';
import { Request, Response } from 'express';
import { AdminService } from '../services/admin.services';
import { PizzaService } from '../services/pizza.services';

const authRouter = Router();

authRouter.get('/', (req: Request, res: Response) => {
  res.render("maga", { title: 'Bem-vindo', bodyClass: 'style/style', layout: 'initial' });
});

authRouter.get('/login', (req: Request, res: Response) => {
  res.render("login", { title: 'Login', bodyClass: 'style/style', layout: 'initial' });
});

authRouter.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;

  await AdminService.login(email, password).then((admin) => {
    if (admin) {
      res.redirect('/maga/admin');
    } else {
      res.redirect('/maga/login');
    }
  }).catch((err) => {
    console.error(err);
    res.redirect('/maga/login');
  });
});

authRouter.get('/register', (req: Request, res: Response) => {
  res.render("registerUser", { title: 'Cadastro de Usuário', bodyClass: 'style/style', layout: 'initial' });
});

authRouter.post('/register', async (req: Request, res: Response) => {
  const { name, email, password, password2 } = req.body;

  var erros = [];

  if (!name || !email || !password || !password2) {
    erros.push({ texto: 'Preencha todos os campos' });
  }

  if (password.length < 6) {
    erros.push({ texto: 'A senha deve ter pelo menos 6 caracteres' });
  }

  if (password != password2) {
    erros.push({ texto: 'As senhas não conferem' });
  }

  if (erros.length > 0) {
    res.render('registerUser', { erros: erros });
  } else {
    await AdminService.createAdmin(name, email, password).then(() => {
      res.redirect('/maga/login');
    }).catch((err) => {
      console.error(err);
      res.redirect('/register');
    });
  }
});

authRouter.get('/about', (req: Request, res: Response) => {
  res.render("about", { title: 'Sobre a Maga Pizzaria', bodyClass: 'style/style', layout: 'initial' });
});

authRouter.get('/catalogoPizzas', async (req: Request, res: Response) => {
  await PizzaService.getPizzas().then((pizzas) => {
    res.render("pizzas", { title: 'Catálogo de Pizzas', bodyClass: 'style/style', layout: 'initial', pizzas });
  }).catch((err) => {
    console.error(err);
    res.redirect('/maga/catalogoPizzas');
  });
});


export { authRouter };