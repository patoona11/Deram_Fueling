/**
 * โครงการทุนเติมฝัน 70 (Dream-Fueling Scholarship 70)
 * Google Apps Script Backend (Code.gs)
 * 
 * วิธีติดตั้ง:
 * 1. เปิด Google Sheet ไอดี: 1nLtm2Exrm0YwIsu_bNnHjRrMhrLqpShP2lD-zE3tZiA
 * 2. ไปที่ Extensions (ส่วนขยาย) > Apps Script
 * 3. นำโค้ดชุดนี้ไปวางแทนที่ทั้งหมดในไฟล์ Code.gs แล้วกดบันทึก
 * 4. กดปุ่ม 'Deploy' (การทำให้ใช้งานได้) > 'New deployment' (การทำให้ใช้งานได้รายการใหม่)
 * 5. เลือกประเภทเป็น 'Web app' (เว็บแอป)
 * 6. ตั้งค่า:
 *    - Execute as: 'Me' (ฉัน)
 *    - Who has access: 'Anyone' (ทุกคน)  <--- สำคัญมาก เพื่อให้ส่งข้อมูลจากหน้าเว็บได้
 * 7. กด Deploy และคัดลอก 'Web app URL' นำไปใส่ที่หน้าเว็บไซต์ในปุ่ม 'ตั้งค่าระบบ API'
 */

function doGet(e) {
  return ContentService.createTextOutput("API ระบบบันทึกข้อมูลโครงการทุนเติมฝัน 70 ทำงานปกติ กรุณาส่งข้อมูลผ่านฟอร์มหน้าเว็บไซต์หลัก");
}

function doPost(e) {
  try {
    // ไอดีของ Google Sheet
    var sheetId = '1nLtm2Exrm0YwIsu_bNnHjRrMhrLqpShP2lD-zE3tZiA'; 
    var sheet = SpreadsheetApp.openById(sheetId).getActiveSheet();

    // รับข้อมูลที่ส่งมาจากเว็บไซต์
    var data = JSON.parse(e.postData.contents);
    var name = data.name;
    var tel = data.tel;
    var date = data.date;
    var time = data.time;
    var amount = data.amount;
    var fileData = data.file;
    var fileName = data.fileName;
    var mimeType = data.mimeType;

    var fileUrl = "";
    
    // หากมีการแนบไฟล์มา ให้บันทึกลง Google Drive
    if (fileData) {
      var decodedFile = Utilities.base64Decode(fileData);
      var blob = Utilities.newBlob(decodedFile, mimeType, fileName);
      
      // บันทึกไฟล์ลงในโฟลเดอร์หลัก (Root) ของ Google Drive
      var folder = DriveApp.getRootFolder(); 
      var file = folder.createFile(blob);
      fileUrl = file.getUrl();
    }

    // นำข้อมูลไปเพิ่มในแถวใหม่ของ Google Sheet
    // คอลัมน์: [A: เวลาบันทึก, B: ชื่อ-สกุล, C: เบอร์โทร, D: วันที่, E: เวลาโอน, F: จำนวนเงิน, G: ลิงก์สลิป]
    sheet.appendRow([new Date(), name, tel, date, time, amount, fileUrl]);

    // ส่งสถานะกลับไปยังหน้าเว็บว่าสำเร็จ
    return ContentService.createTextOutput(JSON.stringify({"result": "success", "url": fileUrl}))
                         .setMimeType(ContentService.MimeType.JSON);
                         
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({"result": "error", "error": error.toString()}))
                         .setMimeType(ContentService.MimeType.JSON);
  }
}
