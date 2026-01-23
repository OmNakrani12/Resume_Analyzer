export function registrationEmail({ name = "User" }) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Welcome to Resume Analyzer</title>
</head>
<body style="margin:0; padding:0; background:#f4f6f8; font-family:Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center" style="padding:30px 0;">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px; overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="background:#2563eb; padding:24px; color:#ffffff;">
              <h1 style="margin:0; font-size:22px;">Welcome to Resume Analyzer 👋</h1>
              <p style="margin:6px 0 0; font-size:14px;">
                Your smart resume improvement partner
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:24px; color:#1f2937;">
              <p style="font-size:16px;">Hi <strong>${name}</strong>,</p>

              <p style="font-size:15px; line-height:1.6;">
                Welcome to <strong>Resume Analyzer</strong>! 🎉  
                We’re excited to help you analyze, improve, and optimize your resume using AI.
              </p>

              <p style="font-size:15px; line-height:1.6;">
                With Resume Analyzer, you can:
              </p>

              <ul style="font-size:14px; line-height:1.6; padding-left:20px;">
                <li>📄 Upload and analyze your resume</li>
                <li>🧠 Get AI-powered insights and ATS score</li>
                <li>💼 Match your resume with job descriptions</li>
                <li>🚀 Improve your chances of getting shortlisted</li>
              </ul>

              <div style="text-align:center; margin:30px 0;">
                <a href="https://yourdomain.com/dashboard"
                  style="
                    background:#2563eb;
                    color:#ffffff;
                    padding:12px 24px;
                    text-decoration:none;
                    border-radius:6px;
                    font-size:15px;
                    font-weight:bold;
                    display:inline-block;
                  ">
                  Go to Dashboard
                </a>
              </div>

              <p style="font-size:14px; line-height:1.6; color:#4b5563;">
                If you have any questions, just reply to this email — we’re always happy to help.
              </p>

              <p style="font-size:14px; margin-top:24px;">
                Best regards,<br />
                <strong>Resume Analyzer Team</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f9fafb; padding:16px; text-align:center; font-size:12px; color:#6b7280;">
              © ${new Date().getFullYear()} Resume Analyzer. All rights reserved.
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `
}
