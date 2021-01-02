import { Role } from "../database/datamodels/enums/role";

export interface JwtPayload {
    username: string;
    role: Role;
}
