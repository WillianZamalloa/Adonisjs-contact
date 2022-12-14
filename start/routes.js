'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
| 
| http://knexjs.org/#Schema-Building   <----- OJO
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

// Route.on('/').render('master')

Route.get('/', async({ response }) => {
    return response.redirect('/contacts')
})

// Rutas de contactos
// Route.get('/contacts', 'ContactController.index').as('contacts.index')
// Route.get('/contacts/create', 'ContactController.create').as('contacts.create')
// Route.post('/contacts', 'ContactController.store').as('contacts.store').validator(['StoreContact'])
// Route.get('/contacts/:id', 'ContactController.show').as('contacts.show')
// Route.get('/contacts/:id/edit', 'ContactController.edit').as('contacts.edit')
// Route.put('/contacts/:id', 'ContactController.update').as('contacts.update')
// Route.delete('/contacts/:id', 'ContactController.destroy').as('contacts.destroy')

// Rutas Resource
Route.resource('contacts', 'ContactController')
     .validator(new Map([
        [['contacts.store'], ['StoreContact']],
     ]))

