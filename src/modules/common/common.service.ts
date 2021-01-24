import { Injectable } from '@nestjs/common';
import { Role } from '@database/datamodels/enums/role';
import { User } from '@database/datamodels/schemas/user';
import { BankingService } from '@src/modules/banking/banking.service';
import { ConsortiumService } from '@src/modules/consortiums/consortium.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CommonService {
    constructor(
        private readonly bankingService: BankingService,
        private readonly consortiumService: ConsortiumService,
        private readonly configService: ConfigService,
    ) {}

    async getEstablishmentName(loggedUser: User): Promise<{ name: string }> {
        console.log('inside get establishment');
        console.log(`logged user = ${JSON.stringify(loggedUser)}`);
        const userRole: Role = loggedUser.role;
        let establishmentName: string;
        switch (userRole) {
            case Role.banker || Role.punter:
                establishmentName = await this.bankingService.getBankingName(loggedUser);
                console.log(`banker name = ${JSON.stringify(establishmentName)}`);
                break;
            case Role.consortium:
                establishmentName = await this.consortiumService.getConsortiumName(loggedUser);
                console.log(`consortium name = ${JSON.stringify(establishmentName)}`);
                break;
            case Role.admin || Role.supervisor || Role.carrier:
                establishmentName = await this.configService.get('APP_TITLE');
                console.log(`consortium name = ${JSON.stringify(establishmentName)}`);
                break;
        }
        console.log(`establishment name = ${JSON.stringify(establishmentName)}`);

        return Promise.resolve({ name: establishmentName });
    }
}
