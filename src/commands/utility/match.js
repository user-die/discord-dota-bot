const fs = require("node:fs");
const { SlashCommandBuilder } = require("discord.js");

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
        .setName("win")
        .setDescription("Кто победил: свет или тьма?")
        .setRequired(true)
        .addChoices(
          {
            name: "dire",
            value: "dire",
          },
          {
            name: "radiant",
            value: "radiant",
          }
        )
    )
    .addStringOption((option) =>
      option
        .setName("player_radiant")
        .setDescription("Игроки света")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("player_dire")
        .setDescription("Игроки тьмы")
        .setRequired(true)
    ),

  async execute(interaction) {
    const id = interaction.options.getNumber("match_id", true);
    const win = interaction.options.getString("win", true);
    const playersRadiant = interaction.options.getString(
      "player_radiant",
      true
    );
    const playersDire = interaction.options.getString("player_dire", true);

    let match = {
      id: parseInt(id),
      win: win,

      players: {
        radiant: [playersRadiant],
        dire: [playersDire],
      },
    };

    const file = JSON.parse(
      fs.readFileSync("./src/stats.json", { encoding: "utf-8" })
    );

    file.matches.push(match);

    await interaction.reply(`Матч добавлен. id ${id} win - ${win}`);
    fs.writeFileSync("./src/stats.json", JSON.stringify(file));
  },
};
