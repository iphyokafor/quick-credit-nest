import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class User extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  firstName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastName: string;

  @Column({
    type: DataType.STRING,
    validate: {
      isEmail: true,
    },
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  address: string;

  @Column({
    type: DataType.ENUM,
    values: ['unverified', 'verified'],
    defaultValue: 'unverified',
    allowNull: false,
  })
  status: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  isAdmin: boolean;
}
