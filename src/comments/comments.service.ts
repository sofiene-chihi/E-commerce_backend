import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment) private commentRespository: Repository<Comment>,
  ) {}

  create(createCommentInput: CreateCommentInput) {
    const newComment = this.commentRespository.create(createCommentInput);
    return this.commentRespository.save(newComment);
  }

  findAll(): Promise<Comment[]> {
    return this.commentRespository.find();
  }

  findOne(id: number): Promise<Comment> {
    return this.commentRespository.findOne(id);
  }

  async updateComment(
    updateCommentInput: UpdateCommentInput,
  ): Promise<Comment> {
    const { id, ...input } = updateCommentInput;
    await this.commentRespository.update(id, input);
    return await this.commentRespository.findOne(id);
  }

  async deleteComment(id: number): Promise<Comment> {
    const foundComment = this.findOne(id);
    if (foundComment) {
      const result = await this.commentRespository.delete(id);
      if (result.affected === 1) {
        return foundComment;
      }
    }
    throw new NotFoundException(`Record not found for  id ${id}`);
  }
}
