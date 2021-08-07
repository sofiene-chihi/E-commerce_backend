import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommandsService } from './commands.service';
import { CommandsResolver } from './commands.resolver';
import { Command } from './command.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Command])],
  providers: [CommandsService, CommandsResolver],
})
export class CommandsModule {}
