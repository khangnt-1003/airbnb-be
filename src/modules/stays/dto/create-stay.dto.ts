import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateStayDto {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsString()
    desc?: string;

    @IsNotEmpty()
    @IsString()
    date: string;

    @IsNumber()
    @IsNotEmpty()
    price: number;

    rating?: number;

    imgSrc?: Array<string>;

    types?: Array<string>;
}
