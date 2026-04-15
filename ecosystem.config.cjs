module.exports = {
  apps: [
    {
      name: 'pilast',
      cwd: __dirname,
      script: '.next/standalone/server.js',
      exec_mode: 'fork',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '512M',
      env: {
        NODE_ENV: 'production',
        HOSTNAME: '127.0.0.1',
        PORT: 3000,
      },
      env_production: {
        NODE_ENV: 'production',
        HOSTNAME: '127.0.0.1',
        PORT: 3000,
      },
    },
  ],
};
