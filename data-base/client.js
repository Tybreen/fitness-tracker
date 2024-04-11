const { Client } = require(`pg`);
const client = new Client(`postgras://localhost:5432/fitnes_stracker`);

module.exports = client;
