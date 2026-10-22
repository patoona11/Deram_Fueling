# โครงการทุนเติมฝัน 70 (Dream-Fueling Scholarship 70) 🎓
คณะเทคโนโลยีอุตสาหกรรม มหาวิทยาลัยนครพนม

ระบบเว็บไซต์สำหรับแจ้งยอดร่วมสมทบทุนการศึกษา พร้อมแนบสลิปหลักฐานการโอนเงิน บันทึกข้อมูลลง Google Sheets และอัปโหลดรูปภาพสลิปไปยัง Google Drive อัตโนมัติ

---

## 📁 โครงสร้างไฟล์ในโฟลเดอร์

- `index.html` : หน้าเว็บไซต์หลัก (ดีไซน์ Responsive รองรับมือถือ 100%, ปิดการแสดงปุ่มตั้งค่าให้ผู้บริจาคทั่วไปเรียบร้อยแล้ว)
- `app.py` : เซิร์ฟเวอร์ Python Flask สำหรับรันในเครื่อง หรือ deploy ขึ้น Cloud
- `requirements.txt` & `Procfile` : ไฟล์คอนฟิกสำหรับ deploy บน Render / Railway / Cloud Server
- `Code.gs` : โค้ด Google Apps Script ฝั่ง Google Sheets & Drive
- `vercel.json` : ไฟล์คอนฟิกสำหรับ deploy บน Vercel

---

## 🔒 การเปิดหน้าต่างตั้งค่าระบบ (สำหรับผู้ดูแลระบบ - Admin)

ปุ่ม "ตั้งค่าระบบ API" ถูกซ่อนจากผู้ใช้งานทั่วไปเรียบร้อยแล้ว หากแอดมินต้องการเปิดแก้ไขเลขบัญชีหรือ URL สามารถเปิดได้ 2 วิธี:
1. **ดับเบิ้ลคลิก (Double Click)** ที่ข้อความลิขสิทธิ์ท้ายหน้าเว็บ:
   `"© โครงการทุนเติมฝัน 70 คณะเทคโนโลยีอุตสาหกรรม มหาวิทยาลัยนครพนม สงวนลิขสิทธิ์"`
2. หรือกดปุ่มคีย์บอร์ดลัด: **`Ctrl + Shift + S`**

---

## 🌐 แนวทางการนำขึ้น Server จริง (Production)

เนื่องจากระบบนี้ส่งข้อมูลและรูปภาพสลิปตรงไปยัง **Google Apps Script & Google Drive** โดยอัตโนมัติ ทำให้คุณสามารถเลือกนำขึ้นเซิร์ฟเวอร์ได้ 3 แบบตามความสะดวก:

### 🌟 วิธีที่ 1: ใช้ Cloud Static Hosting ฟรี (Vercel / Netlify) — *แนะนำที่สุด สะดวกและเร็วที่สุด*
> **ข้อดี:** ฟรี 100%, มี HTTPS (SSL) อัตโนมัติ, ความเร็วสูง, ไม่ล่ม, ไม่ต้องคอยเปิดคอมพิวเตอร์ทิ้งไว้

#### นำขึ้น Vercel / Netlify แบบลาก-วาง (Drop):
1. สมัครใช้งาน [Netlify](https://app.netlify.com/) หรือ [Vercel](https://vercel.com/)
2. หากใช้ **Netlify**: ลากโฟลเดอร์ `Dream-Fueling Scholarship70` ไปวางที่ช่อง **Deploy manually (Drag and drop)**
3. ระบบจะสร้างลิงก์เว็บไซต์พร้อมใช้งาน (เช่น `https://dream-scholarship70.netlify.app`) ให้ทันทีใน 30 วินาที

---

### 🏛️ วิธีที่ 2: นำขึ้นเว็บเซิร์ฟเวอร์ของมหาวิทยาลัย / โฮสติ้งเดิม (cPanel, DirectAdmin, Apache, Nginx)
หากทางคณะหรือมหาวิทยาลัยมีพื้นที่ Web Hosting อยู่แล้ว:
1. เชื่อมต่อเข้าไปยังโฮสติ้งผ่าน **FTP (FileZilla)** หรือ **File Manager ใน cPanel**
2. นำไฟล์ `index.html` ไปอัปโหลดไว้ในโฟลเดอร์ของเว็บ เช่น:
   - `public_html/` หรือสร้างโฟลเดอร์ย่อย `public_html/scholarship70/`
3. เว็บไซต์จะเปิดใช้งานได้ผ่านโดเมนของมหาวิทยาลัยทันที (เช่น `https://it.npu.ac.th/scholarship70`)

---

### 🐍 วิธีที่ 3: นำขึ้น Cloud สำหรับรัน Python Flask (Render / Railway / PythonAnywhere)
หากต้องการรันผ่านเซิร์ฟเวอร์ Python Flask (`app.py`):

#### ผ่าน Render.com (ฟรี):
1. สร้าง GitHub Repository และ Push โฟลเดอร์นี้ขึ้น GitHub
2. ไปที่ [Render Dashboard](https://dashboard.render.com/) > เลือก **New +** > **Web Service**
3. เลือก Repository ที่สร้างไว้
4. ตั้งค่า:
   - **Environment:** `Python 3`
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `gunicorn app:app`
5. กด **Deploy Web Service**
