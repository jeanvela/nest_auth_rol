import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Role, RoleModel } from 'src/models/role.model';

@Module({
  imports: [MongooseModule.forFeature([
    {
      name: Role.name,
      schema: RoleModel
    }
  ])],
  controllers: [RoleController],
  providers: [RoleService]
})
export class RoleModule {}
