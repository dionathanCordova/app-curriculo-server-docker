import { Request, Response } from 'express';
import AuthService from '../services/AuthenticateService';

export default class AuthenticateController{
   public async create(request: Request, response: Response): Promise<Response> {
      try {
         const { email, password } = request.body;

         const authService = new AuthService();
         const { userData, token } = await authService.execute({email, password});

         const user = {
            id: userData.id,
            name: userData.name,
            email: userData.email,
            bio: userData.bio,
            whatsapp: userData.whatsapp,
            avatar: userData.avatar,
            idade: userData.idade,
            genero: userData.genero,
            midias: userData.midias,
            cidade: userData.cidade,
            estado: userData.estado,
            bairro: userData.bairro,
            password: userData.password,
         };

         return response.status(200).json({user, token, status: 'ok', statusCode: 200});
      } catch (error) {
         return response.status(400).json({error: error.message, status: false, statusCode: 400});
      }
   }
}