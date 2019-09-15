"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resources_1 = require("./resources");
let config = resources_1.requireFile('./bot-config.json');
let bot = new resources_1.Bot(config);
bot.connect()
    .then(() => {
    resources_1.logger.debug('Bot Ready');
    console.log('Bot Online');
    bot.listen();
})
    .catch(err => resources_1.logger.error(err));
//# sourceMappingURL=app.js.map