const express = require(`express`);
const app = express();

app.get(`/`, (req, res) => {
  console.log(`RUNNING`);
  res.send(`Hi there`);
});

app.listen(8080, () => console.log(`listening on port 8080`));
