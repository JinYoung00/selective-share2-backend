import { Module } from '@nestjs/common';
import { AppController } from './app/app.controller';
import { AppService } from './app/app.service';
import { Contract } from './app/contract/app.contract';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health/HealthController';


@Module({
  imports: [TerminusModule],
  controllers: [AppController, HealthController],
  providers: [AppService, Contract],
  exports: [Contract], // 다른 모듈에서 사용할 수 있도록 export
})
export class AppModule {}
