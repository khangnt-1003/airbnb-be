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

    @IsNumber()
    rating?: number;

    @IsArray()
    imgSrc?: Array<string>;

    @IsArray()
    types?: Array<string>;
}
