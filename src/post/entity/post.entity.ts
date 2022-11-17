import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SchemaType, SchemaTypes, Types } from 'mongoose';

export class Comment {
  @Prop({ type: SchemaTypes.ObjectId })
  _id: Types.ObjectId;
  
  @Prop({type: String, required: true})
  body: string;
  
  @Prop({ required: true })
  userId: string;

  @Prop({ default: 0 })
  likes: number;
}

@Schema({ versionKey: false })
export class Post {
  @Prop({ type: SchemaTypes.ObjectId })
  _id: Types.ObjectId;

  @Prop({ type: String, required: true })
  title: string;

  @Prop()
  body: string;

  @Prop({ default: 0 })
  likes: number;

  @Prop()
  comments: [Comment];

  @Prop({ required: true })
  userId: string;

  @Prop({ type: Boolean, default: false })
  status: boolean;
}

export const PostSchema = SchemaFactory.createForClass(Post);
