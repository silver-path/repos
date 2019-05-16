const querystring = require('querystring')
const R = require('ramda')
const request = require('request-promise-native')
const {
  GITHUB_OWNER_TOKEN: github_token,
  TRAVIS_OWNER_ACCESS_TOKEN,
  GITHUB_OWNER,
  GITHUB_REPOSITORY
} = require('./environment')
const domain = 'https://api.travis-ci.org'
const headers = {
  'User-Agent': 'MyClient/1.0.0',
  Accept: 'application/vnd.travis-ci.2.1+json'
}
let access_token = TRAVIS_OWNER_ACCESS_TOKEN
const authenticate = async () => {
  const url = `${domain}/auth/github`
  const options = {
    method: 'POST',
    url,
    headers,
    json: true,
    form: { github_token }
  }
  console.log(JSON.stringify(options, null, 2))
  const response = await request(options)
  access_token = R.prop('access_token', response)
}
const find = async () => {
  if (!access_token) await authenticate()
  const url = `${domain}/repos`
  const options = {
    method: 'GET',
    url,
    headers: {
      ...headers,
      Authorization: `token ${access_token}`,
      'Travis-API-Version': 3
    },
    json: true,
  }
  console.log(JSON.stringify(options, null, 2))
  const response = await request(options)
  const repositories = R.propOr([], 'repositories', response)
  const { id = undefined } = repositories.find(({ slug }) => slug === `${GITHUB_OWNER}/${GITHUB_REPOSITORY}`)
  || {}
  return id
}
const activate = async () => {
  if (!access_token) await authenticate()
  const slug = querystring.escape(`${GITHUB_OWNER}/${GITHUB_REPOSITORY}`)
  const url = `${domain}/repo/${slug}/activate`
  const options = {
    method: 'POST',
    url,
    headers: {
      ...headers,
      Authorization: `token ${access_token}`,
      'Travis-API-Version': 3
    },
    json: true,
  }
  console.log(JSON.stringify(options, null, 2))
  return request(options)
}
const configure = async ({ name, value, public = false }) => {
  if (!access_token) await authenticate()
  const slug = querystring.escape(`${GITHUB_OWNER}/${GITHUB_REPOSITORY}`)
  const url = `${domain}/repo/${slug}/env_vars`
  const options = {
    method: 'POST',
    url,
    headers: {
      ...headers,
      Authorization: `token ${access_token}`,
      'Travis-API-Version': 3
    },
    json: true,
    form: {
      'env_var.name': name,
      'env_var.value': value,
      'env_var.public': public
    }
  }
  console.log(JSON.stringify(options, null, 2))
  return request(options)
}
module.exports = { authenticate, find, activate, configure }
