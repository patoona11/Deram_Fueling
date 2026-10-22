import os
import requests
from flask import Flask, render_template, request, jsonify, send_from_directory

app = Flask(__name__, template_folder='.')

# คุณสามารถระบุ Google Apps Script Web App URL ได้ที่นี่
DEFAULT_APPS_SCRIPT_URL = os.environ.get(
    "APPS_SCRIPT_URL", 
    "https://script.google.com/macros/s/AKfycbzxxc0OpfxS89wg-6Ei-uITi_jpO8oyYlYU59wRyqj_roMWGlGl2MXU6eXyDO64YM0Ytw/exec"
)

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/api/submit', methods=['POST'])
def proxy_submit():
    """
    Proxy endpoint สำหรับส่งข้อมูลไปยัง Google Apps Script
    เพื่อแก้ปัญหาเรื่อง CORS หรือ browser security เมื่อเรียกข้ามโดเมน
    """
    try:
        data = request.get_json(force=True)
        apps_script_url = data.get('appsScriptUrl') or DEFAULT_APPS_SCRIPT_URL
        
        if not apps_script_url:
            return jsonify({
                "result": "error",
                "error": "ยังไม่ได้ระบุ Google Apps Script Web App URL"
            }), 400

        # ส่งข้อมูลต่อไปยัง Google Apps Script
        # ส่งแบบ json หรือ plain text
        response = requests.post(
            apps_script_url,
            json=data,
            headers={'Content-Type': 'application/json'},
            timeout=30
        )
        
        try:
            res_json = response.json()
            return jsonify(res_json), response.status_code
        except Exception:
            return jsonify({
                "result": "success" if response.ok else "error",
                "text": response.text
            }), response.status_code

    except Exception as e:
        return jsonify({
            "result": "error",
            "error": str(e)
        }), 500

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    print(f"🚀 เซิร์ฟเวอร์ 'โครงการทุนเติมฝัน 70' กำลังทำงานที่: http://127.0.0.1:{port}")
    app.run(host='0.0.0.0', port=port, debug=True)
