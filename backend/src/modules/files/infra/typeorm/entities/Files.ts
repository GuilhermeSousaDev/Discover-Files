import { User } from "@modules/user/infra/typeorm/entities/User";
import { 
    Column, 
    CreateDateColumn, 
    Entity, 
    ManyToOne, 
    PrimaryGeneratedColumn, 
    UpdateDateColumn,
} from "typeorm";

@Entity('uploaded_files')
export class Files {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    file: string;

    @Column()
    type: string;

    @Column()
    size: number;

    @ManyToOne(_ => User, user => user.posted_files)
    user: User;

    @CreateDateColumn({ default: () => "NOW()" })
    createdAt: Date;

    @UpdateDateColumn({ default: () => "NOW()" })
    updatedAt: Date;
}