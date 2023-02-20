import {
  ApplicationCommandOptionType,
  ApplicationCommandType,
} from 'discord.js'
import moment from 'moment-timezone'
import { Command } from '..'

export const time: Command = {
  type: ApplicationCommandType.ChatInput,
  name: 'time',
  description: 'tell current time',
  options: [
    {
      type: ApplicationCommandOptionType.String,
      name: 'timezone',
      description: 'Timezone',
      required: false,
    },
  ],
  execute: async (client, interaction) => {
    const timezone = interaction.options.getString('timezone')
    const time = (timezone ? moment().tz(timezone) : moment()).locale(
      interaction.locale.toString(),
    )
    const content = time.toLocaleString()

    await interaction.followUp(content)
  },
}
