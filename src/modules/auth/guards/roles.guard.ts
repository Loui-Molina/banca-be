import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserDocument } from '@src/modules/database/datamodels/schemas/user';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly _reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const roles = this._reflector.get<string[]>(
            'roles',
            context.getHandler(),
        );

        if (!roles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user = <UserDocument>request.user;
        return roles.includes(user.role);
    }
}