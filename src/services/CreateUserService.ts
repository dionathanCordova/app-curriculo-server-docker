// import { sign } from 'jsonwebtoken';
import { hash } from 'bcryptjs';
import { getRepository } from 'typeorm';
import User from '../models/UserModel';

interface ICreateData {
   email: string;
   password: string;
}

export default class CreateUserService {
   public async execute({ email, password }: ICreateData): Promise<any> {
      const userRepository = getRepository(User);

      if (!email || !password  ) {
         throw new Error("All fiels are required");
      }

      const checkUserExists = await userRepository.findOne({
         where: { email }
      });

      if (checkUserExists) {
         throw new Error("Email already in use");
      }

      // const token = sign({}, '8889d00d4773aa1c485a26901b89d833', {
      //    subject: email,
      //    expiresIn: '1d',
      // });

      const hashPass = await hash(password, 8);
      const user = userRepository.create({
         email,
         password: hashPass
      })

      await userRepository.save(user);

      if (user) {
         return { user, status: 'ok', statusCode: "201" }
      } else {
         return { status: 'error', statusCode: "400" }
      }
   }
}