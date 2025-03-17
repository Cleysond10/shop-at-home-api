import {
  IsString,
  IsNotEmpty,
  IsEmail,
  Matches,
  MinLength,
  MaxLength,
} from 'class-validator';

export class SignUpDTO {
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  @MaxLength(100, { message: 'Name must be at most 100 characters' })
  name: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Phone number is required' })
  @Matches(/^\d{10,11}$/, { message: 'Phone number must have 10 or 11 numeric digits' })
  phone: string;

  @IsString()
  @IsNotEmpty({ message: 'CPF is required' })
  @Matches(/^\d{11}$/, { message: 'CPF must contain exactly 11 numeric digits' })
  cpf: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must have at least 6 characters' })
  @MaxLength(24, { message: 'Password must have a maximum of 24 characters' })
  password: string;
}
