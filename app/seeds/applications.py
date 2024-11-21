from app.models import db, Application, environment, SCHEMA
from sqlalchemy.sql import text


def seed_applications():
    applications = [
        Application(
            title="Software Engineer",
            status=1,
            description="Design and develop scalable backend systems.",
            website_url="https://www.meta.com/jobs/software-engineer",
            user_id=1,
            company_id=1
        ),
        Application(
            title="Product Manager",
            status=2,
            description="Define product roadmaps and lead cross-functional teams.",
            website_url="https://careers.google.com/jobs/product-manager",
            user_id=1,
            company_id=3
        ),
        Application(
            title="Data Analyst",
            status=3,
            description="Analyze datasets and generate insightful reports.",
            website_url="https://www.amazon.jobs/en/jobs/data-analyst",
            user_id=2,
            company_id=4
        ),
        Application(
            title="UX Designer",
            status=4,
            description="Design user interfaces and conduct usability testing.",
            website_url="https://jobs.netflix.com/ux-designer",
            user_id=2,
            company_id=6
        ),
        Application(
            title="Frontend Developer",
            status=1,
            description="Build interactive web interfaces using React.js.",
            website_url="https://www.apple.com/jobs/frontend-developer",
            user_id=3,
            company_id=5
        ),
    ]

    for application in applications:
        db.session.add(application)

    db.session.commit()


def undo_applications():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.applications RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM applications"))
        
    db.session.commit()
