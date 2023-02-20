import {
  ApplicationCommandOptionType,
  ApplicationCommandType,
} from 'discord.js'
import { Command } from '..'

export const ping: Command = {
  type: ApplicationCommandType.ChatInput,
  name: 'ping',
  description: 'Reply pong to sender.',
  options: [
    {
      type: ApplicationCommandOptionType.Number,
      name: 'value',
      description: 'Value to pong',
      required: false,
    },
  ],
  execute: async (client, interaction) => {
    const value = interaction.options.getNumber('value')
    const content = value ? 'Pong: value' : 'Pong.'

    await interaction.followUp(content)
  },
}
