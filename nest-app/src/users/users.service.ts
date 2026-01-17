import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  // users.service.ts
  async findOne(username: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: {
        username: username,
      },
    });
    if (!user) {
      throw new Error('not found!');
    }
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

// import { Injectable, NotFoundException } from '@nestjs/common';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
// import { User } from './entities/user.entity';
// import { Repository } from 'typeorm';
// import { InjectRepository } from '@nestjs/typeorm';

// @Injectable()
// export class UsersService {
//   constructor(
//     @InjectRepository(User)
//     private userRepository: Repository<User>,
//   ) {}

//   // Tạo user mới
//   async create(createUserDto: CreateUserDto): Promise<User> {
//     const newUser = this.userRepository.create(createUserDto);
//     return await this.userRepository.save(newUser);
//   }

//   // Lấy danh sách tất cả user
//   async findAll(): Promise<User[]> {
//     return await this.userRepository.find();
//   }

//   // Tìm một user bằng username (Dùng cho Auth/Login)
//   async findOne(username: string): Promise<User | null> {
//     return await this.userRepository.findOne({
//       where: { username },
//     });
//   }

//   // Tìm một user bằng ID (Dùng cho các API profile)
//   async findById(id: number): Promise<User | null> {
//     return await this.userRepository.findOneBy({ id });
//   }

//   // Cập nhật thông tin user
//   async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
//     const user = await this.findById(id);
//     if (!user) throw new NotFoundException(`User with ID ${id} not found`);

//     // Merge dữ liệu mới vào user hiện tại
//     const updatedUser = Object.assign(user, updateUserDto);
//     return await this.userRepository.save(updatedUser);
//   }

//   // Xóa user
//   async remove(id: number): Promise<void> {
//     const result = await this.userRepository.delete(id);
//     if (result.affected === 0) {
//       throw new NotFoundException(`User with ID ${id} not found`);
//     }
//   }
// }
