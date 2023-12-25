const axios = require("axios");
const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  category: "utility",
  data: new SlashCommandBuilder()
    .setName("match")
    .setDescription("Записать статистику матча")
    .addNumberOption((option) =>
      option
        .setName("match_id")
        .setDescription("Введите id матча")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("winer-players")
        .setDescription("Команда победителей")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("loser-players")
        .setDescription("Команда проигравших")
        .setRequired(true)
    ),

  async execute(interaction) {
    const id = interaction.options.getNumber("match_id", true);
    const winerPlayers = interaction.options.getString("winer-players", true);
    const loserPlayers = interaction.options.getString("loser-players", true);

    /*
    const result = [];

    winerPlayers.split(",").forEach(async (element) => {
      let response = await fetch(
        `https://discord.com/api/v9/users/${element.replace(/[<@>]/g, "")}`,
        {
          headers: {
            Authorization: `Bot ${token}`,
          },
        }
      );

      let data = await response.json();

      await push(data.global_name);
    });

    console.log(result);*/

    const message = new EmbedBuilder()
      .setTitle("Матч добавлен")
      .setColor(0xff0000)
      .setDescription(
        `Id ${id}\nПобедители: ${winerPlayers}\n Проигравшие: ${loserPlayers}\n Добавил: ${interaction.user}`
      );

    await interaction.reply({ embeds: [message] });

    axios.post("https://sheetdb.io/api/v1/317ga3ng4hhq8", {
      data: {
        id: id,
        Победители: winerPlayers,
        Проигравшие: loserPlayers,
        Добавил: interaction.user.username,
      },
    });
  },
};
