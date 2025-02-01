import { Router } from 'express';
import { Request, Response } from 'express';
import { CustomerService } from '../services/customer.services';
import { PizzaService } from '../services/pizza.services';

const pizzaRouter = Router();

//pizzaRouter.get('/', (req: Request, res: Response) => {
//   res.render("maga", { title: '', bodyClass: 'style/style'});
// });

pizzaRouter.get('/admin', (req: Request, res: Response) => {
  res.render("panel", { title: 'Administração', bodyClass: 'style/style'});
});

pizzaRouter.get('/customers', async (req: Request, res: Response) => {
  try {
    const customers = await CustomerService.getCustomers();

    res.render("customers", { 
      title: 'Clientes', 
      bodyClass: 'style/style', 
      customers
    });

  } catch (err) {
    console.error(err);
    res.redirect('/maga/customers');
  }
});


pizzaRouter.get('/registerClient', (req: Request, res: Response) => {
  res.render("registerClient", { title: 'Cadastro de Cliente', bodyClass: 'style/style'});
});

pizzaRouter.post('/registerClient', async (req: Request, res: Response) => {
    const {name, neighbor, phone, address} = req.body;

    var erros = [];

    if (!name || !neighbor || !phone || !address) {
        erros.push({ texto: 'Preencha todos os campos' });
    }

    if(erros.length > 0){
        res.render('registerClient', { title: 'Cadastro de Cliente', bodyClass: 'style/style', erros: erros });
    } else {
      await CustomerService.createCustomer(name, neighbor, phone, address).then(() => {
        res.redirect('/maga/registerOrder');
      }).catch((err) => { 
        console.error(err);
        res.redirect('/maga/registerClient');
      });
    }

});

pizzaRouter.get('/registerOrder', (req: Request, res: Response) => {
  res.render("registerOrder", { title: 'Cadastro de Pedido', bodyClass: 'style/style'});
});

pizzaRouter.get('/pizzas', async (req: Request, res: Response) => {
  try {
    const pizzas = await PizzaService.getPizzas();

    res.render("pizza", { 
      title: 'Pizzas', 
      bodyClass: 'style/style', 
      pizzas
    });

  } catch (err) {
    console.error(err);
    res.redirect('/maga/pizzas');
  }
 
});

pizzaRouter.get('/registerPizza', (req: Request, res: Response) => {
  res.render("registerPizza", { title: 'Cadastro de Pizza', bodyClass: 'style/style'});
});

pizzaRouter.post('/registerPizza', async (req: Request, res: Response) => {
  const {flavor} = req.body;

  var erros = [];

  if (!flavor) {
      erros.push({ texto: 'Preencha todos os campos' });
  }

  if(erros.length > 0){
      res.render('registerPizza', { title: 'Cadastro de Pizza', bodyClass: 'style/style', erros: erros });
  } else {
    await PizzaService.createPizza(flavor).then(() => {
      res.redirect('/maga/pizzas');
    }).catch((err) => { 
      console.error(err);
      res.redirect('/maga/registerPizza');
    });
  }

});

pizzaRouter.get('/about', (req: Request, res: Response) => {
  res.render("about", { title: 'Sobre a Maga Pizzaria', bodyClass: 'style/style'});
});

pizzaRouter.get('/registerOrder', (req: Request, res: Response) => {
  res.render("registerOrder", { title: 'Cadastro de Pedido', bodyClass: 'style/style', layout: 'initial'});
});

export { pizzaRouter };