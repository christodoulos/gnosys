import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class StrengthenCaseDto {
  @IsNotEmpty()
  @IsString()
  readonly name!: string;
  @IsNotEmpty()
  @IsNumber()
  readonly jobID!: number;
}
