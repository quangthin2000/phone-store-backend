/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})


Route.post('/product', 'ProductsController.store')
Route.get('/product', 'ProductsController.index')
// Route.get('/product/:page', 'ProductsController.pagination')
Route.get('/product/:id', 'ProductsController.show')
Route.put('/product/:id', 'ProductsController.update')
Route.delete('product/:id', 'ProductsController.destroy')



Route.post('/product/:id', 'CartsController.addToCart')
Route.get('/cart', 'CartsController.index')
Route.delete('/cart/:id','CartsController.destroy')
Route.put('/cart/:id','CartsController.update')