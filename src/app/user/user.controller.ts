import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SubmitDto } from './dto/submit.dto';
import { UserService } from './user.service';
import { ApiSecurity } from '@nestjs/swagger';

@ApiSecurity('api-key')
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:userAddress/rewards')
  @ApiOperation({ summary: '사용자 PDT 잔액 조회', description: '사용자의 지갑 주소를 통해 PDT 잔액을 조회합니다.' }) 
  @ApiParam({ name: 'userAddress', description: '사용자의 지갑 주소', example: '0x1234...' }) 
  @ApiResponse({
    status: 200,
    description: '사용자 PDT 잔액 조회 성공',
    schema: {
      example: {
        success: true,
        balance: '100.00',
        message: '잔액 조회가 완료되었습니다.',
      },
    },
  })
  getBalance(@Param('userAddress') userAddress: string) {
    // return this.userService.getBalanceOf(userAddress);;
    return {
      "balance": '100.00',
      "status": "success",
      "message": "잔액 조회 완료"
    };
  }

  @Post('/:userAddress/data')
  @ApiOperation({ summary: '데이터 제출', description: '사용자가 선택한 데이터를 제출합니다.' })
  @ApiParam({ name: 'userAddress', description: '사용자의 지갑 주소', example: '0x1234...' })
  @ApiBody({ description: '제출할 데이터와 서명 정보', type: SubmitDto })
  @ApiResponse({
    status: 201,
    description: '데이터 제출 성공',
    schema: {
      example: {
        success: true,
        txHash: '0xabc123def456...',
        message: '데이터 제출이 완료되었습니다.',
      },
    },
  })
  submitData(@Param('userAddress') userAddress: string, @Body() body: SubmitDto) {
    // return this.userService.rewardUser(userAddress, body.type, body.signature);
    return {
      "txHash": '0xabc123def456...',
      "status": "success",
      "message": "데이터 제출 완료"
   };
  }
}
