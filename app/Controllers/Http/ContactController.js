'use strict'

const Contact = use('App/Models/Contact')
const { validate } = use('Validator')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with contacts
 */
class ContactController {
  /**
   * Show a list of all contacts.
   * GET contacts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
    //recuperamos los contactos
    const contacts = await Contact.all()
    //enviamos los datos a la view
    return view.render('contacts.index', { 
      contacts : contacts.toJSON() 
    })

  }
  /**
   * Render a form to be used for creating a new contact.
   * GET contacts/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create ({ request, response, view }) {
    //recuperamos la vista create
    return view.render('contacts.create')
  }

  /**
   * Create/save a new contact.
   * POST contacts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ session, request, response }) {

    // //Definimos las reglas
    // const rules = {
    //   nombre : 'required|min:3',
    //   telefono : 'required'
    // }
    // //Definimos los mensajes
    // const message = {
    //   'nombre.required' : 'El nombre es un campo requerido',
    //   'nombre.min' : 'El nombre debe tener mas de 3 caracteres',
    //   'telefono.required' : 'El telefono es un campo requerido',
    // }    
    // //Validamos
    // const validacion = await validate(request.all(), rules, message)

    // if (validacion.fails()) {
    //   session.withErrors(validacion.messages())
    //          .flashAll()

    //   return response.redirect('back')
    // }

    //Insertamos en la BD
    await Contact.create({ 
       nombre: request.input('nombre') ,
       telefono: request.input('telefono') ,
    })

    //Volvemos a la pagina anterior
    session.flash({ mensaje: 'Contacto a??adido!' })
    return response.redirect('/contacts')

  }


  /**
   * Display a single contact.
   * GET contacts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
    const contact = await Contact.findOrFail(params.id)
    return view.render('contacts.show', { 
      contact : contact.toJSON() 
    })
  }

  /**
   * Render a form to update an existing contact.
   * GET contacts/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit ({ params, request, response, view }) {
    const contact = await Contact.findOrFail(params.id)
    return view.render('contacts.edit', {  contact })
  }

  /**
   * Update contact details.
   * PUT or PATCH contacts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, session, request, response }) {

    const contact = await Contact.findOrFail(params.id)
          contact.nombre = request.input('nombre')
          contact.telefono = request.input('telefono')
    await contact.save()

    session.flash({ mensaje: 'Contacto modificado!' })
    return response.route('contacts.index')

  }

  /**
   * Delete a contact with id.
   * DELETE contacts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, session, request, response }) {

    const contact = await Contact.findOrFail(params.id)
    await contact.delete()

    //Volvemos a la pagina anterior
    session.flash({ mensaje: 'Contacto eliminado!' })
    return response.redirect('/contacts')

  }
}

module.exports = ContactController
