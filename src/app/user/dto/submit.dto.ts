import { IsArray, IsIn, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SubmitDto {
  @ApiProperty({ description: '사용자 지갑 주소', example: '0x1CBd3b2770909D4e10f157cABC84C7264073C9Ec' })
  @IsString()
  userAddress: string;

  @ApiProperty({ description: '제출할 데이터 항목들', example: ['interest:travel', 'age:30'] })
  @IsArray()
  @IsString({ each: true })
  submittedDataKeys: string[]; // 사용자가 선택한 데이터 항목 키값 (ex: ['location', 'purchaseHistory'])

  @ApiProperty({ description: '제출 구분', example: 'form_submit' })
  @IsIn(['ad_click', 'form_submit', 'campaign_join'])
  type?: 'ad_click' | 'form_submit' | 'campaign_join'; // 행동 유형, 선택사항

  @ApiProperty({ description: '서명값', example: '0x9c6f8e5aa07dfc9a4cf0a...1e719f08cb1d' })
  signature?: string;
}