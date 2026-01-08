import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
// newly added imports
import { Artist } from './entities/artist.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private artistRepository: Repository<Artist>,
  ) {}

  async create(createArtistDto: CreateArtistDto) {
    const artist = this.artistRepository.create(createArtistDto);
    return await this.artistRepository.save(artist);
  }

  async findAll(): Promise<Artist[]> {
    return await this.artistRepository.find();
  }

  async findOne(id: number): Promise<Artist> {
    const artist = await this.artistRepository.findOneBy({ artistId: id });
    if (!artist) {
      throw new Error(`Artist with ID ${id} not found`);
    }
    return artist;
  }

  async update(id: number, updateArtistDto: UpdateArtistDto) {
    const artist = await this.artistRepository.findOneBy({ artistId: id });
    return this.artistRepository.save({ ...artist, ...updateArtistDto });
    // return this.artistRepository.update(id, updateArtistDto);
    // cach t2 nhanh hơn
    // update(): Trả về một đối tượng UpdateResult (chứa thông tin như: bao nhiêu hàng đã bị ảnh hưởng - affected). Nó không trả về dữ liệu của Artist sau khi sửa.
    // save(): Trả về chính đối tượng Entity sau khi đã được lưu vào database.
  }

  async remove(id: number) {
    const artist = await this.artistRepository.findOneBy({ artistId: id });
    if (!artist) {
      throw new Error(`Artist with ID ${id} not found`);
    }
    return this.artistRepository.delete(id);
  }
}
