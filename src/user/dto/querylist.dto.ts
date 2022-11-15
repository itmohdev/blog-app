import { User } from "../entity/user.entity";
import { SearchUserDto } from "./searchuser.dto";
import { FindOptionsOrder } from 'typeorm';

export class QueryInputListDto {
    limit?: number;
    
    skip?: number;

    page?: number;

    order?: FindOptionsOrder<User> 

    filter?: SearchUserDto;
}