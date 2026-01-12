import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Like, Repository } from 'typeorm';
import { Album } from './entities/album.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album)
    private albumRepository: Repository<Album>,
  ) {}

  create(createAlbumDto: CreateAlbumDto) {
    const album = this.albumRepository.create(createAlbumDto);
    return this.albumRepository.save(album);
  }

  async findAll() {
    return await this.albumRepository.find({ relations: ['artist'] });
  }

  async search(name: string) {
    console.log('Searching albums with name:', name);
    return await this.albumRepository.find({
      where: { title: Like(`%${name}%`) },
      relations: ['artist'],
    });
  }

  findOne(id: number) {
    return this.albumRepository.findOne({
      where: { albumId: id },
      relations: ['artist'],
    });
  }

  async update(id: number, dto: UpdateAlbumDto) {
    const album = await this.albumRepository.findOne({
      where: { albumId: id },
    });

    if (!album) {
      throw new NotFoundException('Album not found');
    }

    if (dto.title !== undefined) {
      album.title = dto.title;
    }
    if (dto.artistId !== undefined) {
      album.artistId = dto.artistId;
    }

    return await this.albumRepository.save(album);
  }

  remove(id: number) {
    return this.albumRepository.delete(id);
  }
}
