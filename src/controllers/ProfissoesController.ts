import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import CreateProfissoesService from '../services/CreateProfissoesService';

import Profissoes from '../models/Profissoes';

export default class ProfissoesController {
   public async index(request: Request, response: Response): Promise<Response> {
      const profissoesRepository = getRepository(Profissoes);

      const profissoes = await profissoesRepository.find();

      return response.status(200).json(profissoes);
   }

   public async create(request: Request, response: Response): Promise<Response> {
      try {
         const { name, icon_path } = request.body;
   
         const createProfissoesService = new CreateProfissoesService();
         const create = await createProfissoesService.execute({name, icon_path});
         
         return response.json({ create, status: 'ok', statusCode: 200 })
      } catch (error) {
          return response.status(400).json({ error: error.message, status: false, statusCode: 400 })
      }
   }
}