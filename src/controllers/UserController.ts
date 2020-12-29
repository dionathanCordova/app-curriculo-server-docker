import { compare, hash } from 'bcryptjs';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import User from '../models/UserModel';
import CreateUserService from '../services/CreateUserService';

export default class UserController {
    public async index(request: Request, response: Response): Promise<Response> {

        const userRepository = getRepository(User);

        const users = await userRepository.find();

        return response.json({ users });
    }

    public async create(request: Request, response: Response): Promise<Response> {
        try {
            const { email, password } = request.body;

            const createUserservice = new CreateUserService();
            const user = await createUserservice.execute({ email, password });

            return response.json({ user, status: 'ok', statusCode: 200 })
        } catch (error) {
            return response.status(400).json({ error: error.message, status: false, statusCode: 400 })
        }
    }

    public async findById(request: Request, response: Response): Promise<Response> {
        const { id } = request.body;

        const userRepository = getRepository(User);
        const user = await userRepository.findOne({ id });

        if (user) {
            return response.json(user);
        }

        return response.status(404).json({ error: 'User not found' });
    }

    public async updateUser(request: Request, response: Response): Promise<Response> {
        try {
            const { id } = request.params;
            const { 
                name, 
                email, 
                old_password, 
                password, 
                password_confirmation, 
                whatsapp, 
                bio, 
                idade, 
                cidade, 
                estado, 
                genero,
                bairro
             } = request.body;

            const userRepository = getRepository(User);
            const user = await userRepository.findOne({ id });
            
            if (!user) {
                throw new Error('User does not exists');
            }
            
            if(old_password !== '' && password !== '' && password_confirmation !== '') {
                const comparePass = await compare(old_password, user?.password);
                if (!comparePass) {
                    throw new Error('Credentials not match');
                }
         
                if (password !== password_confirmation) {
                    throw new Error('Credentials not match');
                }
    
                const pass = await hash(password, 8);
                user.password = pass;
            }
        
            user.name = name;
            user.email = email;
            user.whatsapp = whatsapp;
            user.bio = bio;
            user.idade = idade;
            user.cidade = cidade;
            user.estado = estado;
            user.genero = genero;
            user.bairro = bairro;

            await userRepository.save(user);

            return response.status(200).json({ status: 'ok', id: id, user: user });
        } catch (error) {
            return response.status(400).json({ status: error.message})
        }

    }
}