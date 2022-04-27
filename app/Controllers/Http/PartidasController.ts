import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Partida from 'App/Models/MongoModels/Partida'

export default class PartidasController {
  public async index({ response }: HttpContextContract) {
    try
    {
      const partidas = await Partida.find()

      response.ok({message: "Consulta correcta", data: partidas})
    }
    catch(error)
    {
      response.badRequest({message: "ocurrio un error"})
    }
  }

  //public async create({}: HttpContextContract) {}

  public async store({ request, response }: HttpContextContract) {
    try{

      const data = request.all()

      await Partida.create(data)

      response.ok({message: "Se inserto"})
    }
    catch(error)
    {
      response.badRequest({message: "dato(s) invalidos"})
    }
  }

  public async show({ params, response }: HttpContextContract) {
    try
    {
      const partida = await Partida.find({_id: params.id})

      response.ok({message: "Consulta Correcta", data: partida})
    }
    catch(error)
    {
      response.internalServerError()
    }
  }

  //public async edit({}: HttpContextContract) {}

  public async update({ params, request, response }: HttpContextContract) {
    try
    {
      await Partida.updateOne({_id: params.id}, {host: request.input('host'), guest: request.input('guest'), gatito: request.input('gatito'), ganador: request.input('ganador'), estado: request.input('estado'), turno: request.input('turno')})
    }
    catch(error)
    {
      response.badRequest()
    }
  }

  public async ModificarGuest({ params, request, response}: HttpContextContract)
  {
    try{
      await Partida.updateOne({_id: params.id}, {guest: request.input('guest')})

      response.ok({message: "se actualizo"})
    }
    catch(error)
    {
      response.badRequest()
    }
  }

  public async destroy({ params, response }: HttpContextContract) {
    try
    {
      await Partida.deleteOne({_id: params.id})
      response.ok({message: "se elimino correctamente"})
    }
    catch(error)
    {
      response.badRequest()
    }
  }
}
