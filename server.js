js
const express = require('express');
const app = express();
app.use(express.json());

let users = []; // in-memory DB for now
let transactions = [];

app.get('/api/healthz', (req, res) => res.json({status: "ok"}));

app.post('/api/register', (req, res) => {
  const {name, phone, pin} = req.body;
  users.push({name, phone, pin, balance: 100}); // give R100 to test
  res.json({success: true, user: {name, phone, balance: 100}});
});

app.post('/api/login', (req, res) => {
  const {phone, pin} = req.body;
  const user = users.find(u => u.phone === phone && u.pin === pin);
  user ? res.json({success: true, user}) : res.json({success: false});
});

app.get('/api/balance/:phone', (req, res) => {
  const user = users.find(u => u.phone === req.params.phone);
  res.json({balance: user ? user.balance : 0});
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`VeloPay API running on ${PORT}`));
