from app.models import db, CoverLetter, environment, SCHEMA
from sqlalchemy.sql import text


def seed_cover_letters():
    cover_letters = [
        CoverLetter(
            title="Meta Software Engineer Cover Letter",
            application_id=1,
            user_id=1
        ),
        CoverLetter(
            title="Google Product Manager Cover Letter",
            application_id=2,
            user_id=1
        ),
        CoverLetter(
            title="Amazon Data Analyst Cover Letter",
            application_id=3,
            user_id=2
        ),
        CoverLetter(
            title="Netflix UX Designer Cover Letter",
            application_id=4,
            user_id=2
        ),
        CoverLetter(
            title="Apple Frontend Developer Cover Letter",
            application_id=5,
            user_id=3
        ),
    ]

    for cover_letter in cover_letters:
        db.session.add(cover_letter)

    db.session.commit()


def undo_cover_letters():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.cover_letters RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM cover_letters"))
        
    db.session.commit()
