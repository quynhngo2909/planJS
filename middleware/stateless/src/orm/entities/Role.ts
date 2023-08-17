import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany } from "typeorm";
import { UserRole } from "./UserRole";

@Entity({name: "role"})
export class Role extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 150, nullable: false, unique: true })
    name: string;

    @OneToMany(() => UserRole, (UserRole) => UserRole.role)
    userRoles: UserRole[];
}