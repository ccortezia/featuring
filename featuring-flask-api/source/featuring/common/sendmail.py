import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from flask import current_app


def send(subject, to, from_addr=None, text="", html=""):
    msg = MIMEMultipart('alternative')
    msg['Subject'] = subject
    msg['From'] = from_addr or current_app.config['EMAIL_SENDER']
    msg['To'] = to
    text and msg.attach(MIMEText(text, 'plain'))
    html and msg.attach(MIMEText(html, 'html'))
    username = current_app.config['MANDRILL_USERNAME']
    password = current_app.config['MANDRILL_PASSWORD']
    s = smtplib.SMTP('smtp.mandrillapp.com', 587)
    s.login(username, password)
    s.sendmail(msg['From'], msg['To'], msg.as_string())
    s.quit()
