import { IsIn, IsUrl, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterSlotDto {
    @ApiProperty({ description: '광고 슬롯 종류', example: 'banner' })
    @IsIn(['banner', 'video', 'text'])
    slotType: string;
  
    @ApiProperty({ description: '광고 슬록 URI', example: 'https://example.com/page?id=home#banner-slot' })
    @IsUrl()
    uri: string;
  }