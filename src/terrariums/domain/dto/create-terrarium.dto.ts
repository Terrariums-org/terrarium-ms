import {
  IsInt,
  IsNotEmpty,
  IsNotEmptyObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateTerrariumProfileDto } from './create-terrarium_profile.dto';
import { UpdateUserDto } from 'src/shared/dto';
import { TerrariumsInterface } from '../entities';
import { Type } from 'class-transformer';

export class CreateTerrariumDto implements TerrariumsInterface {
  @IsString()
  @IsNotEmpty()
  codeEsp: string;
  @IsInt()
  @IsOptional()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @ValidateNested()
  @IsNotEmptyObject()
  @Type(() => CreateTerrariumProfileDto)
  terrariumProfile: CreateTerrariumProfileDto;

  @ValidateNested()
  @IsNotEmptyObject()
  @Type(() => UpdateUserDto)
  user: UpdateUserDto;
}
