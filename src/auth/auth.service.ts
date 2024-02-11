import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auth } from 'src/models/auth.model';
import { BcryptPasswords } from 'src/utils/bcrypt';
import { AuthenticationAuthDto } from 'src/dto/authentication-auth.dto';
import { CreateAuthDto } from 'src/dto/created-auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(@InjectModel(Auth.name) private authModel: Model<Auth>, private jwtService: JwtService) {}

    async signup(user: CreateAuthDto) {
        const repitEmail = await this.authModel.findOne({email: user.email})
        if (repitEmail) throw new ConflictException('The email is already in use')
        const passwordHash = await BcryptPasswords.hashPassword(user.password)
        const newUser = new this.authModel({ ...user, password: passwordHash })
        await newUser.save()
        return newUser
    }

    async signin(user: AuthenticationAuthDto) {
        const isUser = await this.authModel.findOne({email: user.email})
        if (!isUser) throw new UnauthorizedException('Invalid email')
        const isMatch = await BcryptPasswords.comparePassword(user.password, isUser.password)
        if (!isMatch) throw new UnauthorizedException('Invalid password')
        const payload = {
            id: isUser.id,
            username: isUser.username,
            email: isUser.email,
            status: isUser.status,
            rolId: isUser.rolId,
        }
        return {
            ...payload,
            accessToken: await this.jwtService.signAsync(payload) 
        }
    }
}
