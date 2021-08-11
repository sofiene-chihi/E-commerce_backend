import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
//@resources
import { CommentsService } from './comments.service';
import { Comment } from './comment.entity';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
//@auth
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guards';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/roles.enum';

@Resolver(() => Comment)
export class CommentsResolver {
  constructor(private readonly commentsService: CommentsService) {}

  @Query(() => [Comment], { name: 'comments' })
  @UseGuards(GqlAuthGuard)
  findAll() {
    return this.commentsService.findAll();
  }

  @Query(() => Comment, { name: 'comment' })
  @UseGuards(GqlAuthGuard)
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.commentsService.findOne(id);
  }

  @Mutation(() => Comment)
  @UseGuards(GqlAuthGuard)
  updateComment(
    @Args('updateCommentInput') updateCommentInput: UpdateCommentInput,
  ) {
    return this.commentsService.updateComment(updateCommentInput);
  }

  @Mutation(() => Comment)
  @Roles(Role.Client)
  @UseGuards(GqlAuthGuard, RolesGuard)
  createComment(
    @Args('createCommentInput') createCommentInput: CreateCommentInput,
  ) {
    return this.commentsService.create(createCommentInput);
  }

  @Mutation(() => Comment)
  @Roles(Role.Client)
  @UseGuards(GqlAuthGuard, RolesGuard)
  removeComment(@Args('id', { type: () => Int }) id: number) {
    return this.commentsService.deleteComment(id);
  }
}
