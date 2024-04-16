locals {
  environment = "production"
}

module "contentful" {
  source = "../../modules/contentful"

  environment = local.environment
  github_pat  = var.github_pat
}
