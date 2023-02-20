import { Client, ClientOptions, Events, GatewayIntentBits } from 'discord.js'
import 'dotenv/config'
import Commands from './commands'

/**
 * Options for Discord.js bot client
 */
const clientOptions: ClientOptions = {
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
  ],
  allowedMentions: { parse: ['users', 'roles'], repliedUser: false },
}

/**
 * An Discord.js client for bot
 */
const client = new Client(clientOptions)

// Set an event for when the client is ready.
client.once(Events.ClientReady, async (clientTrue) => {
  await clientTrue.application.commands.set(Commands)
  console.log(`Logged in as ${clientTrue.user.tag}.`)
})

// Set an event for when an interaction is created.
client.on(Events.InteractionCreate, async (interaction) => {
  // handle slash command events
  if (interaction.isChatInputCommand()) {
    const slashCommand = Commands.find(
      (c) => c.name === interaction.commandName,
    )
    if (!slashCommand) {
      interaction.reply({ content: 'An error has occurred.', ephemeral: true })
      return
    }

    await interaction.deferReply()
    // slashCommand.execute must do interaction.followUp(), not interaction.Reply()
    // since command reply is already deferred before executing.
    slashCommand.execute(client, interaction)
  }
})

// Login to discord.
client.login(process.env.TOKEN)
