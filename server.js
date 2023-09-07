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

  if (!slack_name || !track) {
    return next(new Error("both your slack name and track is required"));
  }

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
    github_file_url:
      "https://github.com/Halltech176/hng-internship/blob/main/server.js",
    github_repo_url: "https://github.com/Halltech176/hng-internship.git",
    status_code: 200,
  });
});

app.all("*", (req, res, next) => {
  return res.status(404).json({
    message: "route not found",
  });
});

// Global Error handling Middleware

app.use((err, req, res, next) => {
  return res.status(401).json({
    message: err.message || "an error occured",
  });
});

app.listen(PORT, () => {
  console.log(`server running at port ${PORT}`);
});
