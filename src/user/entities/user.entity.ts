import { Exclude } from 'class-transformer';
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';
import { Role } from './role.entity';

@Entity('users')
export class User extends BaseEntity {
  @Exclude()
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true, nullable: false })
  @Index({ unique: true })
  oid: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 150, nullable: false })
  @Index({ unique: true })
  email: string;

  @Column({ type: 'numeric', nullable: false })
  phone: number;

  @Exclude()
  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Exclude()
  @Column({ type: 'varchar', nullable: false })
  salt: string;

  @ManyToMany(() => Role, { eager: true, cascade: true })
  @JoinTable({ name: 'user_roles_id' })
  roles: Role[];

  @Exclude()
  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @Exclude()
  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @Exclude()
  @DeleteDateColumn({ type: 'timestamp' })
  deleted_at: Date;

  @BeforeInsert()
  private generateOid(): void {
    this.oid = uuid();
  }

  @BeforeInsert()
  private async hashPassword(): Promise<void> {
    this.salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, this.salt);
  }

  async validatePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  }
}
