import {
  ActionRowBuilder,
  ApplicationCommandType,
  ButtonBuilder,
  ButtonInteraction,
  ButtonStyle,
  ComponentType,
} from 'discord.js'
import { Command } from '..'

export const buttonTest: Command = {
  type: ApplicationCommandType.ChatInput,
  name: 'button-test',
  description: 'create two button that increment or decrement reply number.',
  execute: async (client, interaction) => {
    const row = new ActionRowBuilder<ButtonBuilder>()
      .addComponents(
        new ButtonBuilder()
          .setCustomId('decrement')
          .setEmoji('⬅️')
          .setLabel('Decrement')
          .setStyle(ButtonStyle.Primary),
      )
      .addComponents(
        new ButtonBuilder()
          .setCustomId('increment')
          .setEmoji('➡️')
          .setLabel('Increment')
          .setStyle(ButtonStyle.Primary),
      )

    let number = 0

    interaction
      .followUp({ content: `${number}`, components: [row] })
      .then((message) => {
        let collector = message.createMessageComponentCollector({
          componentType: ComponentType.Button,
          time: 10_000,
          filter: (interaction: ButtonInteraction) => {
            interaction.deferUpdate()
            return (
              interaction.customId === 'decrement' ||
              interaction.customId === 'increment'
            )
          },
        })

        collector.on('collect', async (button) => {
          collector.resetTimer()
          if (button.customId === 'decrement') {
            number--
          } else if (button.customId === 'increment') {
            number++
          }

          message.edit({ content: `${number}`, components: [row] })
        })

        collector.on('end', async (button) => {
          row.components.forEach((button) => (button = button.setDisabled()))
          message.edit({ content: `${number}`, components: [row] })
        })
      })
  },
}
