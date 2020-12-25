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
            avatar: userData.avatar
         };

         return response.status(200).json({user, token, status: 200});
      } catch (error) {
         console.log(error.message)
         return response.status(400).json({error: error.message, status: false});
      }
   }
}