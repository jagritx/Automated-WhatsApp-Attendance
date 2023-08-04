import axios from "axios";
import { wrapper } from "axios-cookiejar-support";
import { CookieJar } from "tough-cookie";

async function scraper({ username, password }) {
  const maxAttempts = 2; // Maximum number of connection attempts
  const delay = 1000; // Delay in milliseconds between retry attempts
  let attempts = 0;
  while (attempts < maxAttempts) {
    try {
      const jar = new CookieJar();
      const client = wrapper(axios.create({ jar }));
      axios.defaults.withCredentials = true;
      var body = {
        txtInst: "Institute",
        InstCode: "JUIT",
        txtuType: "Member Type",
        UserType: "S",
        txtCode: "Enrollment No",
        MemberCode: username,
        txtPin: "Password/Pin",
        Password: password,
        BTNSubmit: "Submit",
      };
      await client.get("https://webkiosk.juit.ac.in:9443/");
      await client.post(
        "https://webkiosk.juit.ac.in:9443/CommonFiles/UserAction.jsp",
        {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36",
          },
        },
        { params: { ...body } }
      );

      const response = await client.get(
        "https://webkiosk.juit.ac.in:9443/StudentFiles/Academic/StudentAttendanceList.jsp"
      );

      if (response.data.length > 1000) {
        return response.data;
      } else {
        throw new Error("Invalid Credentials");
      }
    } catch (error) {
      attempts++;
      console.log(
        `Attempt ${attempts}/${maxAttempts} failed. Retrying in ${
          delay / 1000
        } seconds...`
      );
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw new Error(
    `Maximum number of attempts (${maxAttempts}) reached. Could not establish connection.`
  );
}

export default scraper;
