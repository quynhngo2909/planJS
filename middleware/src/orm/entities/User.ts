import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { Role } from "./Role";
import { UserRole } from "./UserRole";

@Entity({name: "user"})
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 150, nullable: false, unique: true })
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    role: string;

    @CreateDateColumn({ type: "timestamp", default: () => "current_timestamp(6)" })
    create_at: Date;

    @UpdateDateColumn({ type: "timestamp" })
    update_at: Date;
}