import {
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsEmail,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(255)
  @IsEmail()
  readonly email!: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(1024)
  readonly password!: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(255)
  givenName!: string;
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(255)
  familyName!: string;
}
