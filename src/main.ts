import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.DEV_PORT || 4000;
  await app.listen(port);
}
bootstrap();
