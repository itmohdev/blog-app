import { InjectModel } from '@nestjs/mongoose';
import { Model, SortOrder, Types } from 'mongoose';
import { CreatePostDto } from './dto/createpost.dto';
import { QueryPostListDto } from './dto/postquery.dto';
import { SearchPostDto } from './dto/searchpost.dto';
import { UpdateDeterminantDto, UpdatePostDto } from './dto/updatepost.dto';
import { Post, PostSchema } from './entity/post.entity';

export class PostRepository {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<Post>,
  ) {}

  async findOne(filterInput: SearchPostDto): Promise<Post> {
    const post = await this.postModel.findOne(filterInput);
    return post;
  }

  async findAll(queryInputList: QueryPostListDto): Promise<[] | Post[]> {
    const posts = await this.postModel
      .find(queryInputList.filterRecord)
      .skip(queryInputList.skip)
      .limit(queryInputList.limit || 10)
      .sort(queryInputList.order);
    return posts;
  }

  async create(createInput: CreatePostDto): Promise<Post> {
    const post = await (await this.postModel.create(createInput)).save();
    return post;
  }

  async update(
    updaterDeterminant: UpdateDeterminantDto,
    updateInput: UpdatePostDto,
  ): Promise<Post> {
    const update = await this.postModel.findOneAndUpdate(
      updaterDeterminant,
      updateInput,
      { new: true },
    );
    return update;
  }

  async remove(id: Types.ObjectId): Promise<Post> {
    const deleteUser = await this.postModel.findByIdAndDelete(id);
    return deleteUser;
  }

  async countDocumentUser(filterInput: SearchPostDto): Promise<number> {
    const countDocument = await this.postModel.find(filterInput).countDocuments();
    return countDocument;
  }
}
