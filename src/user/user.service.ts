import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import{Repository} from 'typeorm'

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>
    ) { }

    async createUser(payload) {
        return await this.userRepo.save(payload)
    }


    async findUser(id:number) {
        const locate = await this.userRepo.findOne({where: {id:id} })
        if (!locate) {
            throw new HttpException('sorry ID NOT FOUND!!!', 404);  
        } else {
             
             return locate;
        }
    }   

    async findAllUsers(payload) {
        const locate = await this.userRepo.find(payload)
        // let usersArray = []
        // usersArray.push(locate)
        return locate
    }

    async ModifyUser(id: number, payload) {
        return await this.userRepo.update(id, payload)
    }

    async removeUser(id: number) {
        return await this.userRepo.delete(id)
    }

}
