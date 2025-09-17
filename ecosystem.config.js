module.exports = {
  apps: [
    {
      name: "medusa-storefront",
      script: "npm",
      args: "run start",
      env: {
        NODE_ENV: "production",
        NEXT_PUBLIC_MEDUSA_BACKEND_URL: "http://localhost:9000",
      }
    }
  ]
};

