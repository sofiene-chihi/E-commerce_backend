import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Int, Args } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/jwt-auth.guard';
import { Command } from './command.entity';
import { CommandsService } from './commands.service';
import { CreateCommandInput } from './dto/create-command-input';
import { UpdateCommandInput } from './dto/update-command-input';

@Resolver(() => Command)
export class CommandsResolver {
  constructor(private commandsService: CommandsService) {}

  @Query(() => [Command])
  @UseGuards(GqlAuthGuard)
  commands(): Promise<Command[]> {
    return this.commandsService.findAll();
  }

  @Query(() => Command)
  @UseGuards(GqlAuthGuard)
  getCommand(@Args('id', { type: () => Int }) id: number): Promise<Command> {
    return this.commandsService.findOne(id);
  }

  @Mutation(() => Command)
  @UseGuards(GqlAuthGuard)
  createCommand(
    @Args('createCommandInput') createCommandInput: CreateCommandInput,
  ): Promise<Command> {
    return this.commandsService.createCommande(createCommandInput);
  }

  @Mutation(() => Command)
  @UseGuards(GqlAuthGuard)
  updateCommand(
    @Args('updateCommandInput') updateCommandInput: UpdateCommandInput,
  ): Promise<Command> {
    return this.commandsService.updateCommand(updateCommandInput);
  }

  @Mutation(() => Command)
  @UseGuards(GqlAuthGuard)
  deleteCommand(@Args('id', { type: () => Int }) id: number): Promise<Command> {
    return this.commandsService.deleteCommand(id);
  }
}
