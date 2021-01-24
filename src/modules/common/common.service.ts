import { Injectable } from '@nestjs/common';
import { Role } from '@database/datamodels/enums/role';
import { User } from '@database/datamodels/schemas/user';
import { ConsortiumService } from '@src/modules/consortiums/consortium.service';
import { ConfigService } from '@nestjs/config';
import { BankingsService } from '@bankings/bankings.service';

@Injectable()
export class CommonService {
    constructor(
        private readonly bankingService: BankingsService,
        private readonly consortiumService: ConsortiumService,
        private readonly configService: ConfigService,
    ) {}

    async getEstablishmentName(loggedUser: User): Promise<{ name: string }> {
        const userRole: Role = loggedUser.role;
        let establishmentName: string;
        switch (userRole) {
            case Role.banker || Role.punter:
                establishmentName = await this.bankingService.getBankingName(loggedUser);
                break;
            case Role.consortium:
                establishmentName = await this.consortiumService.getConsortiumName(loggedUser);
                break;
            case Role.admin || Role.supervisor || Role.carrier:
                establishmentName = await this.configService.get('APP_TITLE');
                break;
        }

        return Promise.resolve({ name: establishmentName });
    }
}
