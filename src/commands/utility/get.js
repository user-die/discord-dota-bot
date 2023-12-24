const fs = require("node:fs");
const { Table } = require("embed-table");
const { SlashCommandBuilder, EmbedBuilder, bold } = require("discord.js");

module.exports = {
  category: "utility",
  data: new SlashCommandBuilder()
    .setName("get")
    .setDescription("Показать статистику всех матчей"),

  async execute(interaction) {
    const file = JSON.parse(
      fs.readFileSync("./src/stats.json", { encoding: "utf-8" })
    );

    id = "Userdie's Bot#9187";

    const map = file.matches.map(
      (el) => `'\n' ${el.id} ${el.win} ${interaction.user.id}`
    );

    const string = `${bold("Матчи")} \n${JSON.stringify(map)}`;

    const table = new Table({
      titles: ["id игры", "Победитель", "Игроки Radiant", "Игроки Dire"],
      titleIndexes: [0, 12, 27, 46],
      columnIndexes: [0, 12, 27, 46],
      start: "`",
      end: "`",
      padEnd: 3,
    });

    table.addRow(["64214", "dire", "userdie", "plut"], { override: 3 });
    table.addRow(["61452", "radiant", "userdie", "plut"], { override: 3 });

    const embed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle("Все игры")
      .addFields(table.toField())
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
    //await interaction.reply(codeBlock(string));
  },
};
