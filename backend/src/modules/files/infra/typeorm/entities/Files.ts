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

    @Column({ unique: true })
    file: string;

    @Column()
    type: string;

    @Column()
    category: string;

    @Column()
    size: number;

    @ManyToOne(_ => User, user => user.posted_files, { eager: true })
    user: User;

    @CreateDateColumn({ default: () => "NOW()" })
    createdAt: Date;

    @UpdateDateColumn({ default: () => "NOW()" })
    updatedAt: Date;
}