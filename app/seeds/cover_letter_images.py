from app.models import db, CoverLetterImage, environment, SCHEMA
from sqlalchemy.sql import text


def seed_cover_letter_images():
    cover_letter_images = [
        CoverLetterImage(
            cover_letter_id=1,
            file_url="https://example-bucket.s3.amazonaws.com/meta_cover_letter.pdf"
        ),
        CoverLetterImage(
            cover_letter_id=2,
            file_url="https://example-bucket.s3.amazonaws.com/google_cover_letter.pdf"
        ),
        CoverLetterImage(
            cover_letter_id=3,
            file_url="https://example-bucket.s3.amazonaws.com/amazon_cover_letter.pdf"
        ),
        CoverLetterImage(
            cover_letter_id=4,
            file_url="https://example-bucket.s3.amazonaws.com/netflix_cover_letter.pdf"
        ),
        CoverLetterImage(
            cover_letter_id=5,
            file_url="https://example-bucket.s3.amazonaws.com/apple_cover_letter.pdf"
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
