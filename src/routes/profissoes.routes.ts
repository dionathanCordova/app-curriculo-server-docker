import { Router } from 'express';

import ProfissoesController from '../controllers/ProfissoesController';
const profissoesController = new ProfissoesController();

const profissoes = Router();

profissoes.get('/', profissoesController.index);
profissoes.post('/create', profissoesController.create);

export default profissoes;