const {
  GITHUB_OWNER,
  GITHUB_REPOSITORY,
  GITHUB_COLLABORATOR_TOKEN,
  NPM_COLLABORATOR_TOKEN,
  CODACY_TOKEN,
  SNYK_TOKEN
} = require('./environment')
const travis = require('./travis')
const slack = require('./slack')
const provision = async () => {
  try {
    await travis.sync()
    await slack.post(`Travis : synced ${GITHUB_OWNER}/${GITHUB_REPOSITORY}`)
    await travis.activate()
    await slack.post(`Travis : activated ${GITHUB_OWNER}/${GITHUB_REPOSITORY}`)
    await travis.configure({ name: 'CODACY_PROJECT_TOKEN', value: `${CODACY_TOKEN}` })
    await travis.configure({ name: 'GITHUB_TOKEN', value: `${GITHUB_COLLABORATOR_TOKEN}` })
    await travis.configure({ name: 'NPM_TOKEN', value: `${NPM_COLLABORATOR_TOKEN}` })
    await travis.configure({ name: 'SNYK_TOKEN', value: `${SNYK_TOKEN}` })
    await slack.post(`Travis : setup environment variables for ${GITHUB_OWNER}/${GITHUB_REPOSITORY}`)
    process.exit(0)
  } catch (e) {
    console.log(e)
    process.exit(1)
  }
}
provision()
