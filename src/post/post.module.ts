import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './entity/post.entity';
import { PostController } from './post.controller';
import { PostRepository } from './post.repository';
import { PostService } from './post.service';

@Module({
  imports: [MongooseModule.forFeature([{name: Post.name, schema: PostSchema}])],
  controllers: [PostController],
  providers: [PostService, PostRepository]
})
export class PostModule {}
