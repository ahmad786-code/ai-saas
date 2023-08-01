/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
          "googleusercontent.com",
          "oaidalleapiprodscus.blob.core.windows.net",
          "cdn.openai.com"
        ]
      },
      typescript: {
        ignoreBuildErrors:true
      }
}

module.exports = nextConfig
