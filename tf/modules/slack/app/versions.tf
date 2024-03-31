terraform {
  required_version = "~> 1.5"

  required_providers {
    slackapp = {
      source  = "yumemi-inc/slackapp"
      version = "~> 0.2.4"
    }
  }
}
