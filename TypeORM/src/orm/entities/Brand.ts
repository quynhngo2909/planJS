import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from "typeorm";

@Entity()
export class Brand extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar", length: 150, nullable: false, unique: true})
    name: string;
}