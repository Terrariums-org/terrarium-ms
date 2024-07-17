import { TerrariumsInterface } from 'src/terrariums/domain/entities';

export type QueueContent = {
  id: number;
  codeEsp: string;
  max_temp: number;
  min_temp: number;
  max_humidity: number;
  min_humidity: number;
  max_uv: number;
  min_uv: number;
  terrarium: TerrariumsInterface;
};
