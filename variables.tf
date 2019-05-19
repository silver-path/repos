variable "PROJECT" {
  default     = "Silver Path"
  description = "Project name"
}

variable "GITHUB_OWNER" {
  description = "Github owner / organization"
}

variable "GITHUB_REPOSITORY" {
  description = "Github repository"
}

variable "GITHUB_COLLABORATOR" {
  description = "Github collaborator to configure"
}

variable "GITHUB_OWNER_TOKEN" {
  description = "Github token for the owner"
}

variable "GITHUB_COLLABORATOR_TOKEN" {
  description = "Github token for the collaborator"
}

variable "TRAVIS_COLLABORATOR_TOKEN" {
  description = "Travis token for the collaborator"
}

variable "TRAVIS_OWNER_ACCESS_TOKEN" {
  description = "Travis token for the owner"
}

variable "NPM_COLLABORATOR_TOKEN" {
  description = "NPM token for collaborator"
}

variable "SLACK_CHANNEL_ID" {
  description = "Slack channel ID"
}

variable "SLACK_OAUTH_TOKEN" {
  description = "Slack App OAuth access token"
}

variable "CODACY_TOKEN" {
  description = "Codacy token"
}

variable "SNYK_TOKEN" {
  description = "Snyk token"
}
