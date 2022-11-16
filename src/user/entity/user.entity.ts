import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum RoleUser {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  username: string;

  @Column({ length: 30 })
  password: string;

  // @Column({
  //   type: 'enum',
  //   enum: RoleUser,
  //   default: RoleUser.USER,
  // })
  @Column({type: "varchar"})
  role: RoleUser;

  @Column({ default: false })
  status: boolean;
}
