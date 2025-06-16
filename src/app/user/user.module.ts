import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Contract } from '../contract/app.contract';

@Module({
  controllers: [UserController],
  providers: [UserService, Contract],
})
export class UserModule {}