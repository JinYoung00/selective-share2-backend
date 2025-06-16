import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ApiKeyGuard } from './ApiKeyGuard';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

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

  const configSwagger = new DocumentBuilder()
    .setTitle('SelectiveShare(SS2) API')
    .setDescription('API for SelectiveShare')
    .setVersion('0.1.0')
    .addApiKey(
      {
        type: 'apiKey',
        name: 'x-api-key', // 요청 헤더에 사용할 키 이름
        in: 'header',
      },
      'api-key', // security name
    )
    .build();
  const document = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('api-docs', app, document);

  app.useGlobalGuards(new ApiKeyGuard(configService));
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
console.log('✅ App started');