import { Album } from 'src/albums/entities/album.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Artist {
  @PrimaryGeneratedColumn()
  artistId: number;

  @Column() 
  name: string;

  @OneToMany(() => Album, (album) => album.artist)
  albums: Album[];
}
