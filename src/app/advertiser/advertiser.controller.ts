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

    @ApiOperation({
      summary: '광고 캠페인 목록 조회',
      description: '광고주가 생성한 광고 캠페인 목록을 반환합니다.',
    })
    @ApiParam({
      name: 'userAddress',
      description: '광고주의 지갑 주소',
      example: '0x1234abcd5678efgh9012ijkl3456mnop7890qrst',
    })
    @ApiResponse({
      status: 200,
      description: '캠페인 목록 조회 성공',
      schema: {
        example: {
          campaigns: [
            {
              campaignId: 'cmp-001',
              name: '친환경 제품 홍보',
              topic: '환경',
              budget: 1000,
              startDate: '2025-06-20',
              endDate: '2025-07-20',
              status: 'active',
            },
            {
              campaignId: 'cmp-002',
              name: '제로 웨이스트 캠페인',
              topic: '지속가능성',
              budget: 500,
              startDate: '2025-05-01',
              endDate: '2025-06-01',
              status: 'paused',
            }
          ]
        }
      }
    })
    @Get('/:userAddress/campaigns')
    getCampaigns(@Param('userAddress') userAddress: string) {
      return {
        campaigns: [],
      };
    }
    
    @ApiOperation({
      summary: '광고 캠페인 일시 중지',
      description: '지정한 광고 캠페인을 일시 중지합니다.',
    })
    @ApiParam({
      name: 'userAddress',
      description: '광고주의 지갑 주소',
      example: '0x1234abcd5678efgh9012ijkl3456mnop7890qrst',
    })
    @ApiParam({
      name: 'campaignId',
      description: '중지할 광고 캠페인의 ID',
      example: 'cmp-001',
    })
    @ApiResponse({
      status: 200,
      description: '캠페인 중지 성공',
      schema: {
        example: {
          success: true,
          message: '캠페인이 일시 중지되었습니다.',
        },
      },
    })
    @Post('/:userAddress/campaigns/:campaignId/pause')
    pauseCampaign(
      @Param('userAddress') userAddress: string,
      @Param('campaignId') campaignId: string,
    ) {
      return {
        success: true,
        message: '캠페인이 일시 중지되었습니다.',
      };
    }
}