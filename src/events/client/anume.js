module.exports = {
  name: "ready",
  async execute(client) {
    const guildId = "925015298967482389";
    const guild = client.guilds.cache.get(guildId);
    client.user.setPresence({
      activities: [{ name: `${guild.name}`, type: "WATCHING" }],
      status: "idle",
    });
    const psc = [
      `${guild.name}`,
      `server hiện tại có ${guild.memberCount} member`,
      `owner sever | Alex♪#2903`,
      `owner bot | vịt buồn#2980`,
      `copyright© 2022 by Senko's coffee☕`
    ];
    setInterval(() => {
      let image = Math.floor(Math.random() * psc.length);
      let i = psc[image];
      client.user.setPresence({
        activities: [{ name: `${i}`, type: "WATCHING" }],
        status: "idle",
      });
    }, 10000);
  },
};
