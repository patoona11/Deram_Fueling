/**
 * โครงการทุนเติมฝัน 70 (Dream-Fueling Scholarship 70)
 * Google Apps Script Backend (Code.gs)
 * 
 * ⚠️ เมื่อแก้ไขโค้ดนี้ใน Google Apps Script ต้อง Deploy เป็น "New version" ทุกครั้ง!
 */

function doGet(e) {
  return ContentService.createTextOutput("API ระบบบันทึกข้อมูลโครงการทุนเติมฝัน 70 ทำงานปกติ");
}

function doPost(e) {
  try {
    var sheetId = '1nLtm2Exrm0YwIsu_bNnHjRrMhrLqpShP2lD-zE3tZiA'; 
    var ss = SpreadsheetApp.openById(sheetId);
    
    // เลือกแท็บ Form_Responses หรือแท็บแรกอัตโนมัติ
    var sheet = ss.getSheetByName("Form_Responses") || ss.getSheetByName("Form Responses 1") || ss.getSheets()[0];

    // รับข้อมูลจากหน้าเว็บ
    var data = JSON.parse(e.postData.contents);
    var name = data.name || "";
    var tel = data.tel ? ("'" + data.tel) : "";  // เติม ' เพื่อให้เลข 0 ข้างหน้าไม่หาย
    var date = data.date || "";
    var time = data.time || "";
    var amount = Number(data.amount) || 0;
    var fileData = data.file;
    var fileName = data.fileName || "slip.jpg";
    var mimeType = data.mimeType || "image/jpeg";

    var fileUrl = "";
    
    // บันทึกไฟล์รูปสลิปไปยัง Google Drive
    if (fileData) {
      var decodedFile = Utilities.base64Decode(fileData);
      var blob = Utilities.newBlob(decodedFile, mimeType, fileName);
      var folder = DriveApp.getRootFolder(); 
      var file = folder.createFile(blob);
      fileUrl = file.getUrl();
    }

    // จัดเรียง 7 คอลัมน์ให้ตรงกับ Google Sheet:
    // คอลัมน์ A: ประทับเวลา
    // คอลัมน์ B: ชื่อ - สกุล ผู้ให้ทุน
    // คอลัมน์ C: เบอร์โทรติดต่อผู้ให้ทุน
    // คอลัมน์ D: วันเดือนปี ( ที่โอนเงิน)
    // คอลัมน์ E: เวลาโดยประมาณ
    // คอลัมน์ F: ยอดที่โอน
    // คอลัมน์ G: กรุณาแนบหลักฐานสลิปการโอนเงิน
    sheet.appendRow([
      new Date(),
      name,
      tel,
      date,
      time,
      amount,
      fileUrl
    ]);

    return ContentService.createTextOutput(JSON.stringify({
      "result": "success", 
      "url": fileUrl
    })).setMimeType(ContentService.MimeType.JSON);
                         
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      "result": "error", 
      "error": error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
