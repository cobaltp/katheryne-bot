import {
  ChatInputApplicationCommandData,
  ChatInputCommandInteraction,
  Client,
} from 'discord.js'
import * as test from './test'

export interface Command extends ChatInputApplicationCommandData {
  execute: (
    client: Client,
    interaction: ChatInputCommandInteraction,
  ) => Promise<void>
}

// Add command groups(aka subdirectories) here
const CommandGroups = [test]
const Commands: Command[] = []
CommandGroups.forEach((group) => Commands.push(...Object.values(group)))

export default Commands
