const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

app.get('/', (req, res) => {
  res.send('Timestamp Microservice is running. Try /api/ or /api/2015-12-25');
});

app.get('/api/:date?', (req, res) => {
  let dateInput = req.params.date;

  let date;

  if (!dateInput) {
    date = new Date();
  } else {
    if (!isNaN(dateInput)) {
      date = new Date(parseInt(dateInput));
    } else {
      date = new Date(dateInput);
    }
  }

  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  return res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});
