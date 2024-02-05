import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/entity/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FileUploadModule } from './file-upload/file-upload.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.getOrThrow('DB_HOST'),
        port: configService.getOrThrow('DB_PORT'),
        username: configService.getOrThrow('DB_USERNAME'),
        password: configService.getOrThrow('DB_PASSWORD'),
        database: configService.getOrThrow('DB_NAME'),
        entities: [UserEntity],
        synchronize: configService.getOrThrow('DB_SYNC'),
      }),
      inject: [ConfigService],
    }),
    UserModule,
    FileUploadModule,
    MulterModule.register({
      dest: './images',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
