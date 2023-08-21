import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";
import { SharedClass } from "./SharedClass";

@Entity()
export class Brand extends SharedClass {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar", length: 150, nullable: false, unique: true})
    name: string;
}