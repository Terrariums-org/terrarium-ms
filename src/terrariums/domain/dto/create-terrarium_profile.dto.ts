import { IsInt, IsNumber, IsOptional } from 'class-validator';

export class CreateTerrariumProfileDto {
  @IsInt()
  @IsOptional()
  id: number;

  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 5 })
  max_temp: number;

  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 5 })
  min_temp: number;

  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 5 })
  max_humidity: number;

  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 5 })
  min_humidity: number;

  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 5 })
  max_uv: number;

  @IsNumber({ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 5 })
  min_uv: number;
}
