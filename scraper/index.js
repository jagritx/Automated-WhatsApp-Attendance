import cron from "node-cron";
import texter from "./utils/texter.js";
import dotenv from "dotenv";
import scrapingService from "./services/scrapingService.js";

dotenv.config();
const cronSchedule = "0 9 * * *"; //Cron Scheduler

const executeCronJob = async () => {
  await scrapingService().then((result) => {
    result.forEach((data) => {
      data.parsedData.attendance.forEach((subject) => {
        texter(subject, data.mobile);
      });
    });
  });
};

cron.schedule(cronSchedule, executeCronJob);
