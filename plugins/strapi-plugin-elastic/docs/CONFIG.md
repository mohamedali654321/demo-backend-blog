```javascript
module.exports = ({ env }) => ({
  connection: {
    node: env('ELASTICSEARCH_HOST', '54.220.211.123'),
    auth: {
      username: env('ELASTICSEARCH_USERNAME', 'USERNAME'),
      password: env('ELASTICSEARCH_PASSWORD', 'PASSWORD'),
    },
  },
  setting: {
    validStatus: [200, 201],
    validMethod: ['PUT', 'POST', 'DELETE'],
    fillByResponse: false,
    importLimit: 3000,
    enable: true,
    removeExistIndexForMigration: false,
    migration: {
      allowEntities: ['all'],
      disallowEntities: [],
    },
  },
  urls: {},
  adminUrls: {}
  );
```
