const request = require('request-promise-native')
const {
  SLACK_CHANNEL_ID,
  SLACK_OAUTH_TOKEN
} = require('./environment')
const domain = 'https://slack.com'
const post = async text => {
  const options = {
    url: `${domain}/api/chat.postMessage`,
    method: 'POST',
    headers: { Authorization: `Bearer ${SLACK_OAUTH_TOKEN}` },
    form: {
      channel: SLACK_CHANNEL_ID,
      text
    },
    json: true
  }
  console.log(JSON.stringify(options, null, 2))
  return request(options)
}
module.exports = { post }

// post('look my shiny metal ass :eyes:')
// .then(console.log)
// .catch(console.error)
