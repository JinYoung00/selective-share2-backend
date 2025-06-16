import { Module } from '@nestjs/common';
import { AppController } from './app/app.controller';
import { AppService } from './app/app.service';
import { Contract } from './app/contract/app.contract';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health/HealthController';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './app/user/user.module';
import { CreatorModule } from './app/creator/creator.module';
import { AdvertiserModule } from './app/advertiser/advertiser.module';

@Module({
  imports: [
    TerminusModule, 
    ConfigModule.forRoot({
      isGlobal: true, // 모든 모듈에서 ConfigService 자동 사용 가능
    }),
    UserModule,
    CreatorModule,
    AdvertiserModule
  ],
  controllers: [HealthController]
})
export class AppModule {}
