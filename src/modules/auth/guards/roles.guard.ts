import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { User } from '@src/modules/database/datamodels/schemas/user';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly _reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const roles = this._reflector.get<string[]>('roles', context.getHandler());
        if (!roles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user = <User>request.user;
        // console.log(`[${request.originalUrl}]`, roles, user.role, roles.includes(user.role));
        return roles.includes(user.role);
    }
}
