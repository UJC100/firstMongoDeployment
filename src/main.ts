import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  })
  );
  app.setGlobalPrefix('api/v1');
  const port = process.env.PORT
  await app.listen(port, ()=> console.log(`server is running on port: ${port}`));
  
}
bootstrap();
