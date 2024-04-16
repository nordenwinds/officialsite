terraform {
  required_version = "~> 1.5"

  required_providers {
    contentful = {
      source  = "labd/contentful"
      version = "~> 0.4.0"
    }
  }
}

provider "contentful" {
  organization_id = var.organization_id
}
