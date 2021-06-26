
module.exports = ({ env }) => ({
  connection: {
    // https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/auth-reference.html
    node: env('ELASTICSEARCH_HOST', 'http://54.220.211.123:9200'),
  },
  setting: {
    validStatus: [200, 201],
    validMethod: ['PUT', 'POST', 'DELETE'],
    importLimit: 3000,
    index_postfix: '',
    index_postfix: '',
    removeExistIndexForMigration: false,
  },
  models: [
    {
      "model": "article",
      "index": "article",
      "plugin": null,
      "enable": true,
      "migration": true,
      "pk": "id",
      "relations": [],
      "conditions": {},
      "fillByResponse": true,
      "supportAdminPanel": true,
      "urls": ['/articles']
    },
    {
      "model": "category",
      "index": "category",
      "plugin": null,
      "enable": true,
      "migration": true,
      "pk": "id",
      "relations": [],
      "conditions": {},
      "fillByResponse": true,
      "supportAdminPanel": true,
      "urls": ['/categories']
    },
  
]
});