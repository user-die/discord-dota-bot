const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  category: "utility",
  data: new SlashCommandBuilder()
    .setName("get")
    .setDescription("Показать статистику всех матчей"),

  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setColor(0xff0000)
      .setAuthor({
        name: "@userdie",
        iconURL:
          "https://sun6-20.userapi.com/67ru5xQtgJfFV3yS8sDkM48mA_dcNhqExTtvkA/sMW2Tskmsco.jpg",
        url: "https://discordapp.com/users/412950844775071746/",
      })
      .setTitle("Таблица с результатами игр")
      .setURL(
        "https://docs.google.com/spreadsheets/d/1pFsu_90hMQLqDfFmdLkwjpSStpyk_87JzKspms8nU0s/edit#gid=0"
      )
      .setThumbnail("https://i.ytimg.com/vi/wAnz3f9LfqQ/maxresdefault.jpg");

    await interaction.reply({ embeds: [embed] });
  },
};
