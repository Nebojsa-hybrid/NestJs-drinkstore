import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { User as PrismaUser } from '@prisma/client';
import {
  IsBoolean,
  IsEmail,
  IsISO8601,
  IsOptional,
  IsString,
} from 'class-validator';

export class User implements PrismaUser {
  @ApiProperty({ type: String, description: 'User API ID.' })
  @IsString()
  id: string;

  @ApiProperty({ type: String, description: 'User email' })
  @IsEmail()
  email: string;

  @ApiProperty({ type: String, description: 'User first name' })
  @IsString()
  name: string;

  @ApiProperty({ type: String, description: 'User last name' })
  @IsString()
  lastName: string;

  @ApiProperty({ type: String, description: 'Created by' })
  @IsOptional()
  @IsString()
  createdBy: string | null;

  @ApiProperty({ type: String, description: 'Updated by' })
  @IsOptional()
  @IsString()
  updatedBy: string | null;

  @ApiProperty({
    type: String,
    description: 'Create UTC timestamp.',
  })
  @IsISO8601()
  createdAt: Date;

  @ApiProperty({
    type: String,
    description: 'Update UTC timestamp.',
  })
  @IsISO8601({})
  updatedAt: Date;

  @ApiPropertyOptional({
    type: String,
    description: 'Delete UTC timestamp.',
  })
  @IsOptional()
  @IsISO8601()
  deletedAt: Date | null;

  @ApiProperty({ type: Boolean, description: 'Is deleted' })
  @IsBoolean()
  deleted: boolean;
}
