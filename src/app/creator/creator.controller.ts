import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags, ApiQuery } from '@nestjs/swagger';
import { ApiSecurity } from '@nestjs/swagger';
import { RegisterSlotDto } from './dto/registerSlot.dto';
import { EarningsDto } from './dto/earnings.dto';


@ApiSecurity('api-key')
@ApiTags('Creator')
@Controller('creator')
export class CreatorController {
    @Post(':userAddress/slots')
    @ApiOperation({ summary: '광고 슬롯 등록', description: '광고가 표시될 슬롯을 등록합니다.' })
    @ApiParam({ name: 'userAddress', description: '크리에이터의 지갑 주소', example: '0x1234...' })
    @ApiBody({ description: '등록할 광고 슬롯 정보', type: RegisterSlotDto })
    @ApiResponse({
        status: 201,
        description: '광고 슬롯 등록 성공',
        schema: {
            example: {
                success: true,
                message: '광고 슬롯이 성공적으로 등록되었습니다.',
                slotId: 'slot12345',
            },
        },
    })
    registerSlot( @Param('userAddress') creatorAddress: string, @Body() body: RegisterSlotDto ) {
        return {
          success: true,
          slotId: 'slot-abc123',
        };
    }

    @ApiOperation({
        summary: '광고 슬롯 목록 조회',
        description: '해당 사용자(creator)가 등록한 광고 슬롯 목록을 반환합니다.',
      })
      @ApiParam({
        name: 'userAddress',
        description: '콘텐츠 생산자의 지갑 주소',
        example: '0x1234abcd5678efgh9012ijkl3456mnop7890qrst',
      })
      @ApiResponse({
        status: 200,
        description: '슬롯 목록 조회 성공',
        schema: {
          example: {
            slots: [
              {
                slotId: 'slot-001',
                slotType: 'banner',
                status: 'active',
                uri: 'https://example.com/ad-slot-001',
                registeredAt: '2024-06-01T12:34:56Z',
              },
              {
                slotId: 'slot-002',
                slotType: 'text',
                status: 'inactive',
                uri: 'https://example.com/ad-slot-002',
                registeredAt: '2024-06-03T09:20:15Z',
              }
            ]
          }
        },
      })
      @Get('/:userAddress/slots')
      getCreatorSlots(@Param('userAddress') userAddress: string) {
        return {
          slots: [],
        };
      }

    @Get(':userAddress/earnings')
    @ApiOperation({ summary: '수익 내역 조회' })
    @ApiParam({ name: 'userAddress', description: '지갑 주소 또는 유저 식별자' })
    @ApiQuery({ name: 'from', required: false, description: '조회 시작일 (YYYY-MM-DD)' })
    @ApiQuery({ name: 'to', required: false, description: '조회 종료일 (YYYY-MM-DD)' })
    @ApiResponse({ status: 200, description: '수익 내역', type: [EarningsDto] })
    getEarnings(
      @Param('userAddress') userAddress: string,
      @Query('from') from?: string,
      @Query('to') to?: string,
    ): EarningsDto[] {
      return [
        {
          date: '2025-06-15',
          amount: 3.2,
          token: 'PDT',
          description: '광고 노출 수익',
        },
      ];
    }

}