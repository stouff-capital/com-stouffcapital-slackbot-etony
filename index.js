const SlackBot = require('slackbots')
const axios = require('axios')

const cTable = require('console.table');

require('dotenv').load();

const bot = new SlackBot({
  token: process.env.BOT_USER_OAUTH_ACCESS_TOKEN,
  name: 'etony',
})


axios({
  method:'get',
  url:process.env.TABLEAU_HOST + '/tableau/data/xls/positions',
  auth: {
    username: process.env.BASIC_AUTH_USERNAME,
    password: process.env.BASIC_AUTH_PASSWORD
  }
})
  .then((response) => {
    console.log( response.data )
  })
  .catch((error) => {
    console.log(error);
  })


// start handler
bot.on('start', () => {
  const params = {
    icon_emoji: ':smiley:'
  }

  //bot.postMessageToChannel('bot', 'Hé mais salut les bons types !', params)
  let msg = cTable.getTable( [ {asset_bbgTicker: 'CSGN SW EQUITY', delta: -200}, {asset_bbgTicker: 'SOON SW EQUITY', delta: 500} ] )
  bot.postMessageToChannel('bot', msg, params)

})
