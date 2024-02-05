import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from '../dto/user.dto';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }
    
    @Post('signUp')
    async addUser(@Body() payload:UserDto) {
        return await this.userService.createUser(payload)
    }

    @Get(':id')
    async getUser(@Param('id') id: number) {
        return await this.userService.findUser(id)
    }

    @Get()
    async getAllUsers(@Param() payload: string[]) {
        return await this.userService.findAllUsers(payload)
    }

    @Put(':id')
    async updateUser(@Param('id') id: number, @Body() payload) {
        return await this.userService.ModifyUser(id, payload)
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: number) {
        return await this.userService.removeUser(id)
    }
}
