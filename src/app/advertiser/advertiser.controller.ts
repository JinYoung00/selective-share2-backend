import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags, ApiQuery } from '@nestjs/swagger';
import { ApiSecurity } from '@nestjs/swagger';
import { get } from 'http';


@ApiSecurity('api-key')
@ApiTags('Advertiser')
@Controller('advertiser')
export class AdvertiserController {
    @Post('/:userAddress/campaigns')
    @ApiOperation({ summary: '광고 캠페인 생성', description: '광고 캠페인을 등록합니다.' })
    @ApiParam({ name: 'userAddress', description: '광고주(Advertiser)의 지갑 주소', example: '0x1234...' })
    @ApiBody({
        schema: {
          type: 'object',
          properties: {
            campaignName: { type: 'string', example: '여름 이벤트 캠페인' },
            topic: { type: 'string', example: '특가 패키지' },
            budget: { type: 'number', example: 500000 },
            startDate: { type: 'string', format: 'date', example: '2024-07-01' },
            endDate: { type: 'string', format: 'date', example: '2024-07-31' },
            exposureType: { type: 'string', enum: ['banner', 'native'], example: 'banner' },
          },
        },
      })
    @ApiResponse({
        status: 201,
        description: '광고 캠페인 등록 성공',
        schema: {
            example: {
                success: true,
                message: '광고 캠페인이 성공적으로 등록되었습니다.',
                campaignId: 'campaign12345',
            },
        },
    })
    createCampaign(
        @Param('userAddress') userAddress: string,
        @Body() body: any,
      ) {
        return { message: 'Campaign created', campaignId: 'abc123' };
      }
    
    @Get('/:userAddress/stats/overview')
    @ApiOperation({ summary: '광고 캠페인 통계 조회', description: '광고 캠페인의 통계 정보를 조회합니다.' })
    @ApiParam({ name: 'userAddress', description: '광고주(Advertiser)의 지갑 주소', example: '0x1234...' })
    @ApiQuery({ name: 'campaignId', required: false, description: '조회할 캠페인 ID' })
    @ApiResponse({
        status: 200,
        description: '통계 요약 반환',
        schema: {
            example: {
                impressions: 1000,
                clicks: 50,
                ctr: 10,
                spend: 20.5,
            },
        },
    })
    getStats(@Param('userAddress') userAddress: string) {
        return {
          totalImpressions: 15234,
          totalClicks: 987,
          ctr: 0.0648,
          totalBudgetUsed: 320000,
        };
    }
    
}