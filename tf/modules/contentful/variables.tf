variable "organization_id" {
  description = "0J9RbtmlEUD3tp8rx9sZsh"
  type        = string
  default     = "Identifer of the Contentful account."
}

variable "project_name" {
  description = "Name of this project."
  type        = string
  default     = "officialsite"
}

variable "environment" {
  description = "Environment."
  type        = string
}

variable "locale" {
  description = "Default locale."
  type        = any
  default = {
    name = "ja_JP"
    code = "ja"
  }
}

variable "github_repo" {
  description = "GitHub Repository for Webhook."
  type        = string
  default     = "nordenwinds/officialsite"
}

variable "github_pat" {
  description = "GitHub Personal Access Token for Webhook."
  type        = string
  sensitive   = true
}
