import { getRepository } from 'typeorm';
import User from '../models/UserModel';
import uploadConfig from '../config/upload';
import path from 'path';
import fs from 'fs';

interface RequestDTO {
   user_id: string;
   avatarFileName: string; 
}

export default class UpdateUserAvatarService {
   public async execute({ user_id, avatarFileName }: RequestDTO): Promise<User> {

      const userRepository = getRepository(User);

      const user = await userRepository.findOne({id: user_id});
      if(!user) {
         throw new Error("User not found");
      }

      if(user.avatar) {
         const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
         const fileExists = await fs.promises.stat(userAvatarFilePath);

         if(fileExists) {
            await fs.promises.unlink(userAvatarFilePath);
         }
      }

      user.avatar = avatarFileName;
      await userRepository.save(user);

      return user;
   }
}