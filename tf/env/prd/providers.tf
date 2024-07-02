terraform {
  required_version = "~> 1.5"

  cloud {
    organization = "nordenwinds"

    workspaces {
      project = "officialsite"
      name    = "production"
    }
  }

  required_providers {
    slackapp = {
      source  = "yumemi-inc/slackapp"
      version = "~> 0.2.4"
    }
  }
}

provider "slackapp" {}
