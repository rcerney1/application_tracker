from app.models import db, CoverLetterImage, environment, SCHEMA
from sqlalchemy.sql import text


def seed_cover_letter_images():
    cover_letter_images = [
        CoverLetterImage(
            cover_letter_id=1,
            file_url="https://drive.google.com/file/d/1LyDZ7HdKkw0GRb4Kz1XEa50QtaW48Pwg/view"
        ),
        CoverLetterImage(
            cover_letter_id=2,
            file_url="https://drive.google.com/file/d/1LyDZ7HdKkw0GRb4Kz1XEa50QtaW48Pwg/view"
        ),
        CoverLetterImage(
            cover_letter_id=3,
            file_url="https://drive.google.com/file/d/1LyDZ7HdKkw0GRb4Kz1XEa50QtaW48Pwg/view"
        ),
        CoverLetterImage(
            cover_letter_id=4,
            file_url="https://drive.google.com/file/d/1LyDZ7HdKkw0GRb4Kz1XEa50QtaW48Pwg/view"
        ),
        CoverLetterImage(
            cover_letter_id=5,
            file_url="https://drive.google.com/file/d/1LyDZ7HdKkw0GRb4Kz1XEa50QtaW48Pwg/view"
        ),
    ]

    for cover_letter_image in cover_letter_images:
        db.session.add(cover_letter_image)

    db.session.commit()


def undo_cover_letter_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.cover_letter_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM cover_letter_images"))
        
    db.session.commit()
