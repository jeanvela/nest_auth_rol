import { Body, Controller, Get, Post } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreatedRoleDto } from 'src/dto/created-role.dto';

@Controller('api')
export class RoleController {
    constructor(private roleService: RoleService) {}

    @Post('role')
    async createRol(@Body() body: CreatedRoleDto) {
        try {
            const newRole = await this.roleService.createdRole(body)
            return newRole
        } catch (error) {
            throw error
        }
    }

    @Get('role')
    async allRoles() {
        try {
            const roles = await this.roleService.allRol()
            return roles
        } catch (error) {
            throw error
        }
    }
}
