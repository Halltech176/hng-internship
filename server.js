import express from "express";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

const app = express();

const PORT = process.env.PORT;

const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

app.get("/api", (req, res, next) => {
  const { slack_name, track } = req.query;

  const currentDate = new Date();
  const current_day = daysOfWeek[currentDate.getDay()];

  const currentMinutes = currentDate.getUTCMinutes();

  const randomMinutes = Math.floor(Math.random() * 5) - 2;

  const newMinute = currentMinutes + randomMinutes;

  currentDate.setUTCMinutes(newMinute);

  const utc_time = currentDate.toISOString();

  return res.status(200).json({
    slack_name,
    current_day,
    utc_time,
    track,
    status_code: 200,
  });
});

app.listen(PORT, () => {
  console.log(`server running at port ${PORT}`);
});
