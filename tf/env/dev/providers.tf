terraform {
  required_version = "~> 1.5"

  cloud {
    organization = "nordenwinds"

    workspaces {
      project = "officialsite"
      name    = "development"
    }
  }

  required_providers {
    slackapp = {
      source  = "yumemi-inc/slackapp"
      version = "~> 0.2.4"
    }
  }
}
