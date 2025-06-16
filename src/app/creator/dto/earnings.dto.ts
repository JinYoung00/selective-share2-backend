import { ApiProperty } from '@nestjs/swagger';

export class EarningsDto {
  @ApiProperty({ example: '2025-06-15', description: '수익 발생일' })
  date: string;

  @ApiProperty({ example: 3.2, description: '수익 금액' })
  amount: number;

  @ApiProperty({ example: 'PDT', description: '토큰 종류' })
  token: string;

  @ApiProperty({ example: '광고 노출 수익', description: '수익 설명' })
  description: string;
}