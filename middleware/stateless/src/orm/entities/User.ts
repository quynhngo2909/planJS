import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity, JoinColumn} from "typeorm";
import { Role } from "./Role";

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

    @ManyToOne(() => Role)
    @JoinColumn({ name: "id" })
    role: Role;
}