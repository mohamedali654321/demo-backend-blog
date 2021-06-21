module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  cron:{
    enabled:true
  },
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', '1c17f80adf78e676f494af6b7d881328'),
    },
  },
});
