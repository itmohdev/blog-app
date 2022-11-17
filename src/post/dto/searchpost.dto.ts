import { IsOptional } from "class-validator";
import { Types } from "mongoose";

export class SearchPostDto {
    @IsOptional()
    _id?: string;

    @IsOptional()
    status?: boolean; 

    @IsOptional()
    userId?: string;  
}