import { IsOptional } from "class-validator";
import { Types } from "mongoose";
import { Comment } from "../entity/post.entity";

export class UpdateDeterminantDto {
    _id: string;
}

export class UpdatePostDto {
    @IsOptional()
    title?: string;
    @IsOptional()
    body?: string;
    @IsOptional()
    status?: boolean;
    @IsOptional()
    comment?: [Comment]
}