output "apikey" {
  description = "API key"
  value       = contentful_apikey.default.access_token
  sensitive   = true
}
