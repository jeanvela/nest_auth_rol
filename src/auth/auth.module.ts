import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Auth, AuthModel } from 'src/models/auth.model';
import { JwtModule } from '@nestjs/jwt';
import { JwtConstans } from 'src/config/configs';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Auth.name,
      schema: AuthModel
    }
  ]), 
    JwtModule.register({
      global: true,
      secret: JwtConstans.secret,
      signOptions: { expiresIn: '1h' }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
