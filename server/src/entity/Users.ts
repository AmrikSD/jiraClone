import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm'
import { ObjectType, Field, Int } from 'type-graphql'

@ObjectType()
@Entity('users')
export class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number

  @Field()
  @Column('text')
  firstName: string

  @Column('text')
  lastName: string

  @Column('int')
  age: number

  @Column('int', { default: 0 })
  tokenVersion: number
}
