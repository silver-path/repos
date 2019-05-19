const R = require('ramda')
const Octokit = require('@octokit/rest')
const {
  GITHUB_OWNER: org,
  GITHUB_OWNER_TOKEN: auth,
  GITHUB_REPOSITORY: repo
} = require('./environment')
const octokit = new Octokit({ auth })
const find = async () => {
  const response = await octokit.repos.listForOrg({ org })
  const repositories = R.propOr([], 'data', response)
  const { id = undefined } = repositories.find(({ full_name }) => full_name === `${org}/${repo}`)
  || {}
  return id
}
module.exports = { find }
