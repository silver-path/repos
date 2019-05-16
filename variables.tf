variable "PROJECT" {
  default     = "Silver Path"
  description = "Project name"
}

variable "GITHUB_OWNER" {
  description = "Github owner / orgnization"
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
