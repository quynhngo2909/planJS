import { Entity, CreateDateColumn, UpdateDateColumn, BaseEntity} from "typeorm";


export class SharedClass extends BaseEntity {

    @CreateDateColumn({type: "timestamp", default: () => "current_timestamp(6)"})
    create_at: Date;

    @UpdateDateColumn({type: "timestamp"})
    update_at: Date;
}