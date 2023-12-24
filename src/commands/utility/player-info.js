const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

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
    let user = interaction.options.getUser("user-id", true);

    const tableUrl = "https://sheetdb.io/api/v1/317ga3ng4hhq8";

    let response = await fetch(tableUrl);

    let data = await response.json();

    const wins = data
      .map((el) => el["Победители"])
      .filter((el) => el === `<@${user.id}>`).length;

    const loses = data
      .map((el) => el["Проигравшие"])
      .filter((el) => el === `<@${user.id}>`).length;

    const embed = new EmbedBuilder()
      .setColor(0xff0000)
      .setTitle(user.globalName)
      .setDescription("Статистика игрока")

      .setThumbnail(
        `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.webp`
      )
      .addFields(
        {
          name: "Винрейт",
          value: Math.round((wins / (wins + loses)) * 100).toString(),
        },
        { name: "\u200B", value: "\u200B" },
        { name: "Победы", value: `${wins}`, inline: true },
        { name: "Поражения", value: `${loses}`, inline: true }
      );

    await interaction.reply({ embeds: [embed] });
  },
};
