provider "github" {
  token        = "${var.GITHUB_OWNER_TOKEN}"
  organization = "${var.GITHUB_OWNER}"
}

# create a new repository for the organization
resource "github_repository" "terraform-infrastructure" {
  name             = "terraform-infrastructure"
  description      = "Hosting and network configuration"
  license_template = "mit"
  lifecycle {
    prevent_destroy = true
  }
}

# add CI bot as admin collaborator
resource "github_repository_collaborator" "collaborator" {
  repository = "${github_repository.terraform-infrastructure.name}"
  username   = "${var.GITHUB_COLLABORATOR}"
  permission = "admin"
}

# provision repository settings for Travis and report to Slack
resource "null_resource" "provisioning" {
  depends_on = ["github_repository_collaborator.collaborator"]

  provisioner "local-exec" {
    command = "node index.js"
  }
}
