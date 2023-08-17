import { Entity, PrimaryGeneratedColumn, BaseEntity, ManyToOne } from "typeorm";
import { Role } from "./Role";
import { User } from "./User";

@Entity({name: "user_role"})
export class UserRole extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Role, (role) => role.userRoles)
    role: Role;

    
    @ManyToOne(() => User)
    user: User;
}