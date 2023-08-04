import dotenv from "dotenv";
import twilio from "twilio";

dotenv.config();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

const fromNum = process.env.FROM;

export default async function texter(subject, mobile) {
  const number = "whatsapp:+91" + mobile;
  try {
    const message = await client.messages.create({
      from: fromNum,
      body: formatAttendanceData(subject),
      to: number,
    });
    console.log("Message sent:", message.sid);
  } catch (error) {
    if (error.code === 63018) {
      console.error("Rate-limiting error:", error.message);
    } else {
      console.error("Error sending message:", error);
    }
  }
}

function formatAttendanceData(attendanceData) {
  let beautifiedData = "";

  for (let key in attendanceData) {
    if (key !== "sno") {
      beautifiedData += `${key}: ${attendanceData[key]}\n`;
    }
  }

  return beautifiedData;
}
