import { Module } from '@nestjs/common';
import { AppController } from './app/app.controller';
import { AppService } from './app/app.service';
import { Contract } from './app/contract/app.contract';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health/HealthController';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TerminusModule, 
    ConfigModule.forRoot({
      isGlobal: true, // 모든 모듈에서 ConfigService 자동 사용 가능
    }),
  ],
  controllers: [AppController, HealthController],
  providers: [AppService, Contract],
  exports: [Contract], // 다른 모듈에서 사용할 수 있도록 export
})
export class AppModule {}
