const fs = require("node:fs");
const { SlashCommandBuilder, codeBlock, bold } = require("discord.js");

module.exports = {
  category: "utility",
  data: new SlashCommandBuilder()
    .setName("getmatches")
    .setDescription("Показать статистику всех матчей"),

  async execute(interaction) {
    const file = JSON.parse(
      fs.readFileSync("./src/stats.json", { encoding: "utf-8" })
    );

    const map = file.matches.map(
      (el) => `'\n' ${el.id} ${el.win} ${el.players}`
    );

    const string = `${bold("Матчи")} \n${JSON.stringify(map)}`;

    await interaction.reply(codeBlock(string));
  },
};
