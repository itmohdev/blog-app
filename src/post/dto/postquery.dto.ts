import { SortOrder } from "mongoose";
import { SearchPostDto } from "./searchpost.dto";


export class QueryPostListDto {
    sortDec?: SortOrder;
    skip?: number;
    limit?: number;
    page?: number;
    order?: "title"| "status" | "likes";
    filterRecord?: Partial<SearchPostDto>;
}