import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
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

    @CreateDateColumn({type: "timestamp", default: () => "current_timestamp(6)"})
    create_at: Date;

    @UpdateDateColumn({type: "timestamp"})
    update_at: Date;
}