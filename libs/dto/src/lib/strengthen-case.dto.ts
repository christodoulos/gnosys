import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class StrengthenCaseDto {
  @IsNotEmpty()
  @IsString()
  readonly name!: string;
  @IsNotEmpty()
  @IsString()
  readonly jobID!: number;
  timestamp!: Date;
  finishedOn!: Date;
  processedOn!: Date;
  progress!: string;
}
