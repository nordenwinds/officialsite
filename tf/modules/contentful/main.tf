resource "contentful_space" "default" {
  # TODO: Commonalize: Environment should belong same space
  name = var.project_name
}

resource "contentful_environment" "default" {
  # TODO: Configure alias
  space_id = contentful_space.default.id

  name = var.environment
}

resource "contentful_locale" "default" {
  space_id = contentful_space.default.id

  name     = var.locale.name
  code     = var.locale.code
  optional = false
}

resource "contentful_webhook" "gha" {
  # TODO: Filter triggerd environment
  # TODO: Configure payload
  space_id = contentful_space.default.id

  name = "GitHub Actions"
  url  = "https://api.github.com/repos/${var.github_repo}/dispatches"
  topics = [
    "Entry.publish",
    "Entry.unpublish",
  ]
  headers = {
    Accept               = "application/vnd.github+json"
    X-GitHub-Api-Version = "2022-11-28"
    Authorization        = var.github_pat
    User-Agent           = "Contentful-${var.project_name}"
  }
}

resource "contentful_apikey" "default" {
  # TODO: Specify environment scope
  space_id = contentful_space.default.id

  name        = var.environment
  description = "API key for ${var.environment}."
}
