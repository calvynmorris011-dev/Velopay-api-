javascript
const express = require('express');
const app = express();
app.use(express.json());

let users = [];

app.post('/api/register', (req, res) => {
  users.push(req.body);
  res.json({ success: true });
});

const PORT = process.env.PORT || 10000;
app.listen(PORT);
