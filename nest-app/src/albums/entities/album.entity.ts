import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn,  } from 'typeorm';
import { Artist } from 'src/artists/entities/artist.entity';
@Entity()
export class Album {
    @PrimaryGeneratedColumn()
    albumId: number;

    @Column()
    title: string;

    @Column({ nullable: true })
    artistId: number;

    @ManyToOne(() => Artist, (artist) => artist.albums)
    @JoinColumn({ name: 'artistId' })
    artist: Artist;
}
