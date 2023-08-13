import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import {Brand} from "./Brand";

@Entity()
export class Product extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar", length: 150, nullable: false, unique: true})
    name: string;

    @Column()
    price: number;

    @ManyToOne(() => Brand)
    brand: Brand;
}