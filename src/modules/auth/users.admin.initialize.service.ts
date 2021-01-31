import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '@auth/auth.service';
import { SignUpCredentialsDto } from '@auth/dtos/sign.up.credentials.dto';
import { AuthUserService } from '@auth.user/auth.user.service';
import { Role } from '@database/datamodels/enums/role';

@Injectable()
export class UsersAdminInitializeService implements OnModuleInit {
    private readonly logger: Logger = new Logger(UsersAdminInitializeService.name);
    constructor(
        private readonly authService: AuthService,
        private readonly configService: ConfigService,
        private readonly authUserService: AuthUserService,
    ) {}
    async onModuleInit(): Promise<void> {
        const adminUser = await this.authUserService.getUserByUsernameRole(
            this.configService.get<string>('ADMIN_USER'),
            Role.admin,
        );
        if (adminUser == null) {
            let signUpCredentialsDto = new SignUpCredentialsDto();
            signUpCredentialsDto.name = this.configService.get('ADMIN_USER');
            signUpCredentialsDto.password = this.configService.get('ADMIN_PASSWORD');
            signUpCredentialsDto.username = this.configService.get('ADMIN_USER');
            signUpCredentialsDto.role = Role.admin;
            this.authService.signUp(signUpCredentialsDto, null);
            this.logger.debug('User created admin correctly');
        }
    }
}
