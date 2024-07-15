locals {
  environment = "development"
}

module "slackapp" {
  source = "../../modules/slack/app"

  environment = local.environment
}
