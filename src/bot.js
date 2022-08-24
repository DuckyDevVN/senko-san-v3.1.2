const { Client, Intents, Collection } = require("discord.js");
const { connect, Schema } = require("mongoose");
const chalk = require("chalk");
const fs = require("fs");
const config = require("./config");
/*Client Intents*/
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
});
/*Client Collection*/
client.aliases = new Collection();
client.commands = new Collection();
/*Function Fs*/
const functionFolders = fs.readdirSync("./src/functions");
for (const folder of functionFolders) {
  const functionFiles = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter((file) => file.endsWith(".js"));
  for (const file of functionFiles)
    require(`./functions/${folder}/${file}`)(client);
}
/*Client handlers*/
client.handlerCommands();
client.handlerEvents();
/*Login client*/
client.login(config.token);
/*Connect MongoDB*/
(async () => {
  connect(config.mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  }).catch((err) => {
    console.log(chalk.red(err))
  });
})();
/*Client mongodb coin*/
const moneyUser = require("./Schemas/money");
client.add = async (id, coins) => {
  moneyUser.findOne({ id }, async (err, data) => {
    if (err) Error(err);
    if (data) {
      data.coins += coins;
    } else {
      data = new moneyUser({ id, coins });
    }
    data.save();
  });
};
client.rmv = async (id, coins) => {
  moneyUser.findOne({ id }, async (err, data) => {
    if (err) Error(err);
    if (data) {
      data.coins -= coins;
    } else {
      data = new moneyUser({ id, coins: -coins });
    }
    data.save();
  });
};
client.bal = (id) => new Promise(async (ful) => {
  const data = await moneyUser.findOne({ id });
  if (!data) return ful(0);
  ful(data.coins);
});
/*Client mongodb bank*/
const bankUser = require("./Schemas/bank");
client.addBank = async (id, coins) => {
  bankUser.findOne({ id }, async (err, data) => {
    if (err) Error(err);
    if (data) {
      data.coins += coins;
    } else {
      data = bankUser({ id, coins });
    }
    data.save();
  });
};
client.rmvBank = async (id, coins) => {
  bankUser.findOne({ id }, async (err, data) => {
    if (err) Error(err);
    if (data) {
      data.coins -= coins;
    } else {
      data = new bankUser({ id, coins: -coins });
    }
    data.save();
  });
};
client.balBank = (id) => new Promise(async (ful) => {
  const data = await bankUser.findOne({ id });
  if (!data) return ful(0);
  ful(data.coins);
});
/*Client mongodb DTC*/
const DTCsenkoUser = require('./Schemas/thiencam');
client.addDTC = async (id, coins) => {
  DTCsenkoUser.findOne({ User: id }, async (err, data) => {
    if (err) Error(err);
    if (data) {
      data.coins += coins;
    } else {
      data = DTCsenkoUser({ User: id, coins: coins });
    }
    data.save();
  });
};
client.rmvDTC = async (id, coins) => {
  DTCsenkoUser.findOne({ id }, async (err, data) => {
    if (err) Error(err);
    if (data) {
      data.coins -= coins;
    } else {
      data = new DTCsenkoUser({ id, coins: -coins });
    }
    data.save();
  });
};
client.balDTC = (id) => new Promise(async (ful) => {
  const data = await DTCsenkoUser.findOne({ User: id });
  if (!data) return ful(0);
  ful(data.coins);
});
/*Client mongodb Gold*/
const goldUser = require("./Schemas/moneyGold");
client.addGold = async (id, coins) => {
  goldUser.findOne({ User: id }, async (err, data) => {
    if (err) Error(err);
    if (data) {
      data.coins += coins;
    } else {
      data = new goldUser({ User: id, coins });
    }
    data.save();
  });
};
client.rmvGold = async (id, coins) => {
  goldUser.findOne({ User: id }, async (err, data) => {
    if (err) Error(err);
    if (data) {
      data.coins -= coins;
    } else {
      data = new goldUser({ User: id, coins: -coins });
    }
    data.save();
  });
};
client.balGold = (id) => new Promise(async (ful) => {
  const data = await goldUser.findOne({ User: id });
  if (!data) return ful(0);
  ful(data.coins);
});
/*Client mongodb pre*/
const preUser = require("./Schemas/moneyPre");
client.addPre = async (id, coins) => {
  preUser.findOne({ User: id }, async (err, data) => {
    if (err) Error(err);
    if (data) {
      data.coins += coins;
    } else {
      data = new preUser({ User: id, coins });
    }
    data.save();
  });
};
client.rmvPre = async (id, coins) => {
  preUser.findOne({ User: id }, async (err, data) => {
    if (err) Error(err);
    if (data) {
      data.coins -= coins;
    } else {
      data = new preUser({ User: id, coins: -coins });
    }
    data.save();
  });
};
client.balPre = (id) => new Promise(async (ful) => {
  const data = await preUser.findOne({ User: id });
  if (!data) return ful(0);
  ful(data.coins);
});
/*Client mongodb epic*/
const epicUser = require("./Schemas/moneyEpic");
client.addEpic = async (id, coins) => {
  goldUser.findOne({ User: id }, async (err, data) => {
    if (err) Error(err);
    if (data) {
      data.coins += coins;
    } else {
      data = new epicUser({ User: id, coins });
    }
    data.save();
  });
};
client.rmvEpic = async (id, coins) => {
  epicUser.findOne({ User: id }, async (err, data) => {
    if (err) Error(err);
    if (data) {
      data.coins -= coins;
    } else {
      data = new epicUser({ User: id, coins: -coins });
    }
    data.save();
  });
};
client.balEpic = (id) => new Promise(async (ful) => {
  const data = await epicUser.findOne({ User: id });
  if (!data) return ful(0);
  ful(data.coins);
});
/*Client mongodb bank gold*/
const bankGoldUser = require("./Schemas/bankGold");
client.addBankGold = async (id, coins) => {
  bankGoldUser.findOne({ User: id }, async (err, data) => {
    if (err) Error(err);
    if (data) {
      data.coins += coins;
    } else {
      data = bankGoldUser({ User: id, coins: coins });
    }
    data.save();
  });
};
client.rmvBankGold = async (id, coins) => {
  bankUser.findOne({ User: id }, async (err, data) => {
    if (err) Error(err);
    if (data) {
      data.coins -= coins;
    } else {
      data = new bankGoldUser({ User: id, coins: -coins });
    }
    data.save();
  });
};
client.balBankGold = (id) => new Promise(async (ful) => {
  const data = await bankGoldUser.findOne({ User: id });
  if (!data) return ful(0);
  ful(data.coins);
});
/*Client mongodb bank pre*/
const bankPreUser = require("./Schemas/bankPre");
client.addBankPre = async (id, coins) => {
  bankGoldUser.findOne({ User: id }, async (err, data) => {
    if (err) Error(err);
    if (data) {
      data.coins += coins;
    } else {
      data = bankPreUser({ User: id, coins: coins });
    }
    data.save();
  });
};
client.rmvBankPre = async (id, coins) => {
  bankUser.findOne({ User: id }, async (err, data) => {
    if (err) Error(err);
    if (data) {
      data.coins -= coins;
    } else {
      data = new bankPreUser({ User: id, coins: -coins });
    }
    data.save();  });
};
client.balBankPre = (id) => new Promise(async (ful) => {
  const data = await bankPreUser.findOne({ User: id });
  if (!data) return ful(0);
  ful(data.coins);
});
/*Client mongodb bank gold*/
const bankEpicUser = require("./Schemas/bankEpic");
client.addBankEpic = async (id, coins) => {
  bankGoldUser.findOne({ User: id }, async (err, data) => {
    if (err) Error(err);
    if (data) {
      data.coins += coins;
    } else {
      data = bankEpicUser({ User: id, coins: coins });
    }
    data.save();
  });
};
client.rmvBankEpic = async (id, coins) => {
  bankEpicUser.findOne({ User: id }, async (err, data) => {
    if (err) Error(err);
    if (data) {
      data.coins -= coins;
    } else {
      data = new bankEpicUser({ User: id, coins: -coins });
    }
    data.save();
  });
};
client.balBankEpic = (id) => new Promise(async (ful) => {
  const data = await bankGoldUser.findOne({ User: id });
  if (!data) return ful(0);
  ful(data.coins);
});