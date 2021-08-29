import { Resolver, Query, Mutation, Int, Args } from '@nestjs/graphql';
import { Command } from './command.entity';
import { CommandsService } from './commands.service';
import { CommandData } from './dto/command-data';
import { CreateCommandInput } from './dto/create-command-input';
import { UpdateCommandInput } from './dto/update-command-input';

@Resolver(() => Command)
export class CommandsResolver {
  constructor(private commandsService: CommandsService) {}

  @Query(() => [Command])
  commands(): Promise<Command[]> {
    return this.commandsService.findAll();
  }

  @Query(() => Command)
  getCommand(@Args('id', { type: () => Int }) id: number): Promise<Command> {
    return this.commandsService.findOne(id);
  }

  @Mutation(() => Command)
  createCommand(
    @Args('commandData') commandData: CommandData,
  ): Promise<Command> {
    return this.commandsService.generateOrder(commandData);
  }

  @Mutation(() => Command)
  updateCommand(
    @Args('updateCommandInput') updateCommandInput: UpdateCommandInput,
  ): Promise<Command> {
    return this.commandsService.updateCommand(updateCommandInput);
  }

  @Mutation(() => Command)
  deleteCommand(@Args('id', { type: () => Int }) id: number): Promise<Command> {
    return this.commandsService.deleteCommand(id);
  }
}
