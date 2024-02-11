import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Role } from 'src/models/role.model';
import { InjectModel } from '@nestjs/mongoose';
import { CreatedRoleDto } from 'src/dto/created-role.dto';

@Injectable()
export class RoleService {
    constructor(@InjectModel(Role.name) private roleModel: Model<Role>) {}

    async createdRole(role: CreatedRoleDto) {
        const newRol = new this.roleModel(role)
        await newRol.save()
        return newRol
    }

    async allRol() {
        const roles = await this.roleModel.find()
        return roles
    }
}
