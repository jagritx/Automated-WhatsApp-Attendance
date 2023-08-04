import { load } from "cheerio";

export default function parser(data) {
  const $ = load(data);
  // Extract student information
  const studentName = $('form[name="frm"] tr:nth-child(1) td:nth-child(1)')
    .text()
    .trim();
  const courseBranch = $('form[name="frm"] td:nth-child(2)').text().trim();
  const currentSemester = $('form[name="frm"] td:nth-child(3)').text().trim();

  // Extract attendance data
  const attendanceRows = $("#table-1 tbody tr").toArray();
  const attendance = attendanceRows.map((row) => {
    const $row = $(row);
    const sno = $row.find("td:nth-child(1)").text().trim();
    const subject = $row.find("td:nth-child(2)").text().trim();
    let lectureTutorialAttendance = $row
      .find("td:nth-child(3) a")
      .text()
      .trim();
    let lectureAttendance = $row.find("td:nth-child(4) a").text().trim();
    let tutorialAttendance = $row.find("td:nth-child(5)").text().trim();
    let practicalAttendance = $row.find("td:nth-child(6) a").text().trim();
    const formattedAttendance = {
      sno,
      subject,
      Combined: lectureTutorialAttendance || "",
      Lecture: lectureAttendance || "",
      Tutorial: tutorialAttendance || "",
      Practical: practicalAttendance || "",
    };

    // Removing empty properties
    Object.keys(formattedAttendance).forEach((key) => {
      if (formattedAttendance[key] === "") {
        delete formattedAttendance[key];
      }
    });

    return formattedAttendance;
  });

  return {
    studentName,
    courseBranch,
    currentSemester,
    attendance,
  };
}
