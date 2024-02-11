import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from 'src/dto/created-auth.dto';
import { AuthenticationAuthDto } from 'src/dto/authentication-auth.dto';
import { Response } from 'express';

@Controller('api')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('signUp')
    async signUp(@Body() body: CreateAuthDto) {
        try {
            const newUser = await this.authService.signup(body)
            return newUser
        } catch (error) {
            throw error.message
        }
    }

    @Post('signIn')
    async signIn(@Body() body: AuthenticationAuthDto, @Res() res: Response) {
        try {
            const user = await this.authService.signin(body)
            const token = user.accessToken
            res.header('Authorization', `Bearer ${token}`)
            return res.status(HttpStatus.OK).json(user)
        } catch (error) {
            throw error.message
        }
    }
}
