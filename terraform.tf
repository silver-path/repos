terraform {
  backend "s3" {
    encrypt        = true
    region         = "ap-southeast-1"
    bucket         = "terraform-prod-state-storage-s3-silver-path"
    dynamodb_table = "terraform-prod-state-lock-dynamo-silver-path"
    key            = "./terraform-infrastructure/terraform.tfstate"
  }
}
