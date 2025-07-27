from flask import Flask,render_template,request,redirect
import smtplib
from email.message import EmailMessage



app = Flask(__name__, static_folder='static', static_url_path='/static')


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
    
    
    


projects = {
    "ct-kbc": {
        "title": "CT-KBC ",
        "overview": "COBRA KBC is a Python-based quiz game that simulates the popular TV show 'Kaun Banega Crorepati'. It features multiple lifelines, randomized questions, and progressive rewards, offering users a challenging and engaging command-line experience. The project highlights strong programming logic and real-time interaction skills.",
        "image": "p6.png",
        "description": "A Python-based quiz game emulating the famous KBC format.",
        "tags": ["Python", "Quiz", "CLI", "Game"],
        "technologies": ["Python", "random", "time", "JSON"],
        "features": [
            "6 Lifelines",
            "Real-time gameplay",
            "Replayable question logic"
        ],
        "enhancements": [
            "Add GUI",
            "Leaderboard",
            "Audio support"
        ],
         "screenshots": [
        "screenshots/ct-kbc/screen1.png",
        "screenshots/ct-kbc/screen2.png",
        "screenshots/ct-kbc/screen3.png",
        "screenshots/ct-kbc/screen4.png",
        "screenshots/ct-kbc/screen5.png",
        "screenshots/ct-kbc/screen6.png",
        "screenshots/ct-kbc/screen7.png"
    ],
        "impact": "This project helped solidify understanding of Python basics, conditional logic, user input handling, and control structures while simulating a full game loop. It boosted problem-solving skills and creativity through lifeline logic.",
        "github": "https://github.com/nickrajput716/COBRA-KBC.git"
    },
    "ct-farma": {
        "title": "CT-FARMA -HP",
        "website": "https://ct-farma.onrender.com",
        "overview": "CT-Farma (HP) is an AI-powered farming assistant built with Flask and JavaScript. It offers farmers in Himachal Pradesh real-time weather, crop recognition via images, and access to market data. This full-stack solution integrates APIs and ML, making it a standout portfolio piece for smart agriculture.",
        "image": "p1.png",
        "description": "AI-based agriculture platform for Himachal farmers.",
        "tags": ["AI", "Farming", "Flask"],
        "technologies": [
            "Flask", "Python", "HTML", "CSS", "JavaScript",
            "PlantNet API", "Mistral AI", "OpenWeather API", "Alpha Vantage"
        ],
        "features": [
            "AI-powered crop and soil identification",
            "Weather & market info",
            "Farming calculators",
            "Hindi/English support"
        ],
         "screenshots": [
        "screenshots/ct-farma/screen1.png",
        "screenshots/ct-farma/screen2.png",
        "screenshots/ct-farma/screen3.png",
        "screenshots/ct-farma/screen4.png",
        "screenshots/ct-farma/screen5.png",
        "screenshots/ct-farma/screen6.png",
        "screenshots/ct-farma/screen7.png"
    ],
        "enhancements": [
            "Voice-based queries",
            "IoT sensor integration",
            "Pest/Disease detection",
            "Blockchain marketplace"
        ],"impact": "This project demonstrated integration of AI, APIs, and dynamic content into a full-stack app for real-world impact. It developed expertise in Flask, image recognition APIs, multilingual support, and the ability to solve real agricultural challenges.",
        "github": "https://github.com/nickrajput716/CT-Farma.git"
    },
    "ct-rps": {
        "title": "CT-RPS",
        "overview": "CT-RPS is a classic browser-based Rock Paper Scissors game. It allows users to play against a computer with animated results, live score tracking, and smooth UI transitions. Built using HTML, CSS, and JavaScript, it demonstrates interactive design and client-side game logic skills.",
        "image": "p4.png",
        "description": "A simple web game to play Rock, Paper, Scissors against the computer.",
        "tags": ["Game", "Web", "JavaScript"],
        "technologies": ["HTML", "CSS", "JavaScript"],
        "features": [
            "Click-based input",
            "Live score tracking",
            "Animated result feedback"
        ], "screenshots": [
        "screenshots/ct-rps/screen1.png",
        "screenshots/ct-rps/screen2.png",
        "screenshots/ct-rps/screen3.png",
        "screenshots/ct-rps/screen4.png",
        "screenshots/ct-rps/screen5.png",
        "screenshots/ct-rps/screen6.png",
        "screenshots/ct-rps/screen7.png"
    ],
        "enhancements": [
            "Add sound effects",
            "Improve AI opponent",
            "Add multiplayer mode"
        ], "impact": "This project strengthened core web development skills by implementing game logic in JavaScript. It built confidence in DOM manipulation, CSS transitions, and interactive UI creation with instant user feedback.",
        "github": "https://github.com/nickrajput716/rpc.git"
    },
    "ct-weather": {
        "title": "CT-WEATHER",
        "overview": "The Weather Channel is a sleek, glassmorphic React app that delivers real-time weather updates using external APIs. With responsive design and modern styling, it presents detailed forecasts in a clean UI, showcasing React component skills, third-party integration, and attention to user experience and SEO.",
        "image": "p5.png",
        "description": "A React-based real-time weather forecast app with beautiful UI.",
        "tags": ["React", "Weather", "Web"],
        "technologies": [
            "React.js", "JavaScript", "HTML", "CSS",
            "OpenWeather API", "React Helmet"
        ],
        "features": [
            "Live weather updates",
            "Responsive UI",
            "Glassmorphic design"
        ], "screenshots": [
        "screenshots/ct-weather/screen1.png",
        "screenshots/ct-weather/screen2.png",
        "screenshots/ct-weather/screen3.png",
        "screenshots/ct-weather/screen4.png",
        "screenshots/ct-weather/screen5.png",
        "screenshots/ct-weather/screen6.png",
        "screenshots/ct-weather/screen7.png"
    ],
        "enhancements": [
            "Add location search",
            "Unit conversion (°C/°F)",
            "5-day forecast view"
        ],"impact": "This project enhanced React.js skills and deepened knowledge in API integration, state management, responsive design, and SEO optimization using tools like React Helmet. It also taught principles of modern UI/UX.",
        "github": "https://github.com/nickrajput716/weather.git"
    },
    "ct-paycal": {
        "title": "CT-PAYCAL",
        "overview": "CT-PAYCAL (PaisaCal) is a full-stack web app that uses a satirical theme to calculate 'dowry demands'. Featuring interactive animations and a Flask-based ML backend, it combines humor with technical depth—highlighting data handling, form logic, and real-world regression modeling using Python libraries.",
        "image": "p2.png",
        "description": "A satirical and ML-powered calculator to estimate dowry demands.",
        "tags": ["ML", "Flask", "Calculator"],
        "technologies": [
            "Python", "Flask", "NumPy", "Pandas",
            "scikit-learn", "HTML", "CSS", "JavaScript"
        ],
        "features": [
            "Dynamic form UI with scroll-based animations",
            "Linear regression prediction",
            "Dark theme and glassmorphic UI"
        ], "screenshots": [
        "screenshots/ct-paycal/screen1.png",
        "screenshots/ct-paycal/screen2.png",
        "screenshots/ct-paycal/screen3.png",
        "screenshots/ct-paycal/screen4.png",
        "screenshots/ct-paycal/screen5.png",
        "screenshots/ct-paycal/screen6.png",
        "screenshots/ct-paycal/screen7.png"
    ],
        "enhancements": [
            "Better dataset",
            "Deploy on cloud",
            "Community awareness mode"
        ], "impact": "This project enhanced full-stack development experience, combining machine learning and Flask backend with interactive UI. It also allowed exploration of social commentary through tech, refining both technical and communication skills.",
        "github": "https://github.com/nickrajput716/ct-dhaj.git"
    },
    "ct-planner": {
        "title": "CT-PLANNER",
        "overview": "CT-PLANNER is a web-based application designed to generate seating arrangements for MST exams. Built with Flask and JavaScript, it features dynamic multi-step forms and intuitive layout generation, enabling educational institutions to automate exam seating efficiently and visually.",
        "image": "p3.png",
        "description": "A planner tool to automate seating arrangements during MSTs.",
        "tags": ["Planner", "Automation", "Education"],
        "technologies": ["HTML", "CSS", "JavaScript", "Python", "Flask"],
        "features": [
            "Dynamic form steps",
            "Generates seating layout",
            "Easy visual transitions"
        ], "screenshots": [
        "screenshots/ct-planner/screen1.png",
        "screenshots/ct-planner/screen2.png",
        "screenshots/ct-planner/screen3.png",
        "screenshots/ct-planner/screen4.png",
        "screenshots/ct-planner/screen5.png",
        "screenshots/ct-planner/screen6.png",
        "screenshots/ct-planner/screen7.png"
    ],
        "enhancements": [
            "Add CSV import/export",
            "PDF generation of plans",
            "Role-based access"
        ],"impact": "This tool developed backend and frontend fluency, especially with dynamic form generation and layout rendering. It provided experience in building productivity tools and data-driven automation for education use cases.",
        "github": "https://github.com/nickrajput716/ct-planner.git"
    }
}


@app.route("/projects/<project_id>")
def show_project(project_id):
    project = projects.get(project_id)
    if project:
        print(project_id)
        return render_template("project_detail.html", project=project)

    else:
        return "Project not found", 404


@app.route('/team-history')
def team_history():
    return render_template('team-history.html')

@app.route('/meet-the-team')
def meet_the_team():
    return render_template('meet-the-team.html')

@app.route('/team-achievements')
def team_achievements():
    return render_template('team-achievements.html')

@app.route('/team-gallery')
def team_gallery():
    return render_template('team-gallery.html')

@app.route('/faq')
def faq():
    return render_template('faq.html')

@app.route('/support')
def support():
    return render_template('support.html')

@app.route('/terms')
def terms():
    return render_template("terms.html")

@app.route('/chilling')
def chilling():
    return render_template('chilling.html')
    
if __name__=="__main__":
    app.run(debug=True)
