from .db import db, environment, SCHEMA, add_prefix_for_prod

class CoverLetterImage(db.Model):
    __tablename__ = 'cover_letter_images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    cover_letter_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('cover_letters.id')), nullable=False, unique=True)
    file_url = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=db.func.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=db.func.now(), onupdate=db.func.now())

    # Relationships
    cover_letter = db.relationship("CoverLetter", back_populates="image")

    def to_dict(self):
        return {
            "id": self.id,
            "cover_letter_id": self.cover_letter_id,
            "file_url": self.file_url,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
