const { SlashCommandBuilder } = require("discord.js");
const axios = require("axios");

module.exports = {
  category: "utility",
  data: new SlashCommandBuilder()
    .setName("player-info")
    .setDescription("Replies with Pong!")
    .addUserOption((option) =>
      option
        .setName("user-id")
        .setDescription("тегните пользователя")
        .setRequired(true)
    ),
  async execute(interaction) {
    const user = interaction.options.getUser("user-id", true);

    axios
      .get("https://sheetdb.io/api/v1/317ga3ng4hhq8")
      .then((response) =>
        console.log(
          response.data
            .map((el) => el["Победители"])
            .filter((el) => el === `<@${user.id}>`)
        )
      );

    await interaction.reply("qw");
  },
};
