import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistsModule } from './artists/artists.module';
// newly added import
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AlbumsModule } from './albums/albums.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({
        type: configService.get<string>('DB_TYPE', 'mysql') as 'mysql',
        host: configService.get<string>('DB_HOST', 'localhost'),
        // host: 'db',
        port: Number(configService.get<number>('DB_PORT', 3306)),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        // entities: [__dirname + '/**/*.entity{.ts,.js}'],
        entities: [],
        autoLoadEntities: true,
        synchronize: false,
      }),
    }),
    ArtistsModule,
    AlbumsModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
