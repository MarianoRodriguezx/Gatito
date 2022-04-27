import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class AuthController {

    public async login({ response, request, auth }: HttpContextContract)
    {
        const email = await request.input('email')
        const password = await request.input('password')

        try
        {
            const token = await auth.attempt(email, password)
            response.ok({message: "login correcto", token: token})
        }
        catch(error)
        {
            response.unauthorized({message: "Credenciales Invalidas"})
        }
    }

    public async register({ request, response, auth }: HttpContextContract)
    {
        try
        {
            const password = request.input('password')
            const data = request.all()

            const user = await User.create(data)

            const token = await auth.attempt(user.email, password)
            response.ok({message: "Registro Correcto", token: token})
        }
        catch(error)
        {
            response.badRequest({message: "La data es incorrecta"})
        }
    }

    public async logout({ auth, response }: HttpContextContract){
        try
        {
            await auth.use('api').revoke()

            response.ok({message: "Deslogueo Correcto"})
        }
        catch(error)
        {
            response.internalServerError({message: "Ocurrio un error"})
        }
    }

    public async userData({ response, auth }: HttpContextContract)
    {
        try
        {
            response.ok({message: "datos de el usuario encontrados", data: auth.user})
        }
        catch(error)
        {
            response.badRequest({message: "El usuario no existe o el token esta caducado"})
        }
    }
}
