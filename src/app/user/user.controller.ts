import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags, ApiQuery } from '@nestjs/swagger';
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
  @ApiOperation({ summary: '사용자 참여 및 보상 이력 조회', description: '사용자가 참여한 캠페인과 받은 보상을 날짜별로 조회합니다.' })
  @ApiParam({ name: 'userAddress', description: '사용자의 지갑 주소', example: '0x1234...abcd' })
  @ApiQuery({ name: 'from', required: false, description: '시작 날짜 (YYYY-MM-DD)', example: '2024-06-01' })
  @ApiQuery({ name: 'to', required: false, description: '종료 날짜 (YYYY-MM-DD)', example: '2024-06-15' })
  @ApiResponse({
    status: 200,
    description: '이력 목록 조회 성공',
    schema: {
      example: {
        history: [
          {
            date: '2024-06-14',
            actions: [
              {
                type: 'ad_view',
                campaign: '친환경 세제 캠페인',
                reward: '10 PDT',
                txHash: '0xabc123...'
              },
              {
                type: 'form_submit',
                campaign: '건강 설문조사',
                reward: '5 PDT',
                txHash: '0xdef456...'
              }
            ]
          },
          {
            date: '2024-06-13',
            actions: [
              {
                type: 'campaign_join',
                campaign: 'NFT 퀘스트',
                reward: '15 PDT',
                txHash: '0xghi789...'
              }
            ]
          }
        ]
      }
    }
  })
  @Get('/:userAddress/history')
  getHistory(
    @Param('userAddress') userAddress: string,
    @Query('from') from?: string,
    @Query('to') to?: string
  ) {
    return { history: [] }; // mock response
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
