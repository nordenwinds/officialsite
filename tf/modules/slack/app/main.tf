data "slackapp_manifest" "default" {
  display_information {
    name             = var.environment == "production" ? "Contact Form" : "Contact Form (${var.environment})"
    description      = "Notice from contact form on official site."
    background_color = "#2c2d30"
  }

  features {
    bot_user {
      display_name  = "ContactForm"
      always_online = false
    }
  }

  oauth_config {
    scopes {
      bot = ["incoming-webhook"]
    }
  }

  settings {
    org_deploy_enabled     = false
    socket_mode_enabled    = false
    token_rotation_enabled = false
  }
}

resource "slackapp_application" "default" {
  manifest = data.slackapp_manifest.default.json
}
