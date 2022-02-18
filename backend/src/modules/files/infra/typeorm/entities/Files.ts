import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('uploaded_files')
export class Files {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    file: string;

    @Column()
    type: string;

    @CreateDateColumn({ default: () => "NOW()" })
    createdAt: Date;

    @UpdateDateColumn({ default: () => "NOW()" })
    updatedAt: Date;
}