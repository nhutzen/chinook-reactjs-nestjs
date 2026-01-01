import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Artist {
  @PrimaryGeneratedColumn()
  artistId: number;

  @Column() 
  name: string;
}
