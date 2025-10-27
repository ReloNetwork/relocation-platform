module.exports = {
  apps: [
    {
      name: "relo-web",
      script: "npm",
      args: "start",
      watch: false,
      env: {
        NODE_ENV: "development",
        PORT: 3001
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 3001
      },
      autorestart: true,
      max_memory_restart: "1G"
    }
  ]
}


