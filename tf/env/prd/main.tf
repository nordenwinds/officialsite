locals {
  environment = "production"
}

module "slackapp" {
  source = "../../modules/slack/app"

  environment = local.environment
}
