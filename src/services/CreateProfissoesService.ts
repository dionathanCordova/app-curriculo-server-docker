import { getRepository } from "typeorm";

import Profissoes from '../models/Profissoes';

interface RequestProps {
   name: string;
   icon_path: string;
}

export default class CreateProfissoesService {
   public async execute({name, icon_path}:RequestProps): Promise<any> {
      const profissoesRepository = getRepository(Profissoes);

      const findProfissao = await profissoesRepository.findOne({ where: { name } });

      if(findProfissao) {
         throw new Error("This Job title is already registered");
      }

      const job = profissoesRepository.create({
         name,
         icon_path
      })

      await profissoesRepository.save(job);

      if (job) {
         return { job, status: 'ok', statusCode: "201" }
      } else {
         throw new Error("Cant register this job");
      }
   }
}