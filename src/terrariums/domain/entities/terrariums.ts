import { TerrariumsProfileInterface } from './terrariums_profile';
import { UpdateUserDto } from 'src/shared/dto';

export interface TerrariumsInterface {
  id: number;
  codeEsp: string;
  name: string;
  user?: UpdateUserDto;
  terrariumProfile: TerrariumsProfileInterface;
}
