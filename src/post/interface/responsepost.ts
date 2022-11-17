import { Post } from '../entity/post.entity';

export interface ResposeAllPosts {
  limit?: number;

  page?: number;

  data: Post[] | [];
  totalPosts: number
  totalPages?: number;
  havePrevPage?: boolean;
  haveNextPage?: boolean;
}
