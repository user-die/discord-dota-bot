const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  category: "utility",
  data: new SlashCommandBuilder()
    .setName("info")
    .setDescription("Информация о всех командах"),

  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setColor(0xff0000)
      .setTitle("Все команды")
      .addFields(
        {
          name: "Записать результат матча",
          value: "/match",
        },
        { name: "Получить статистику игрока", value: "/player-info" },
        { name: "Таблица всех игр", value: "/get" }
      );

    await interaction.reply({ embeds: [embed] });
  },
};
