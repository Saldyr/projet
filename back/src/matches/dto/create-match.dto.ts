import {
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateMatchDto {
  @IsInt()
  @Min(1)
  clubHomeId: number;

  @IsInt()
  @Min(1)
  clubAwayId: number;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsString()
  @MaxLength(255)
  matchAddress: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  scoreTeamHome?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  scoreTeamAway?: number;
}
