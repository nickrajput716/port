from flask import Flask,render_template,request,redirect
import smtplib
from email.message import EmailMessage


app=Flask(__name__)

app.secret_key="abc"


@app.route('/')
def index():
    return render_template("index.html")
    
    
    
@app.route('/contact', methods=['POST'])
def contact():
    name = request.form['name']
    email = request.form['email']
    message = request.form['message']

    email_msg = EmailMessage()
    email_msg['Subject'] = f"New Contact Form Message from {name}"
    email_msg['From'] = YOUR_EMAIL
    email_msg['To'] = 'nickrajput716@gmail.com'
    email_msg.set_content(f"Name: {name}\nEmail: {email}\n\nMessage:\n{message}")

    try:
        with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
            smtp.login(YOUR_EMAIL, YOUR_PASSWORD)
            smtp.send_message(email_msg)
        return "Message sent successfully!"
    except Exception as e:
        return f"Something went wrong: {e}"

# Replace with your actual Gmail account
YOUR_EMAIL = 'fakenikhilrana@gmail.com'
YOUR_PASSWORD = 'ebko xcvx ohfc vrgk'
    
    
if __name__=="__main__":
    app.run(debug=True)