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
    contentful = {
      source  = "labd/contentful"
      version = "~> 0.4.0"
    }
  }
}
