import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, CreateDateColumn, UpdateDateColumn, Timestamp } from "typeorm";

@Entity()
export class Brand extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: "varchar", length: 150, nullable: false, unique: true})
    name: string;

    @CreateDateColumn({type: "timestamp", default: () => "current_timestamp(6)"})
    create_at: Date;

    @UpdateDateColumn({type: "timestamp"})
    update_at: Date;
}