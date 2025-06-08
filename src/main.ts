import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ApiKeyGuard } from './ApiKeyGuard';
import { ConfigService } from '@nestjs/config';

process.on('unhandledRejection', (reason: any) => {
  process.stderr.write('Unhandled Rejection: ' + reason?.message + '\n');
});
process.on('uncaughtException', (err) => {
  process.stderr.write('Uncaught Exception: ' + err.message + '\n');
  process.exit(1);
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });
  const configService = app.get(ConfigService);

  app.useGlobalGuards(new ApiKeyGuard(configService));
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
console.log('✅ App started');