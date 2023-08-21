import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import {Brand} from "./Brand";
import { SharedClass } from "./SharedClass";

@Entity()
export class Product extends SharedClass{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar", length: 150, nullable: false, unique: true})
    name: string;

    @Column()
    price: number;

    @ManyToOne(() => Brand)
    brand: Brand;
}