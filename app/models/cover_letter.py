from .db import db, environment, SCHEMA, add_prefix_for_prod

class CoverLetter(db.Model):
    __tablename__ = 'cover_letters'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    application_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('applications.id')), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=db.func.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=db.func.now(), onupdate=db.func.now())

    # Relationships
    user = db.relationship("User", back_populates="cover_letters")
    application = db.relationship("Application", back_populates="cover_letters")
    image = db.relationship("CoverLetterImage", back_populates="cover_letter", uselist=False, cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "application_id": self.application_id,
            "application_title": self.application.title if self.application else None,
            "user_id": self.user_id,
            "image": self.image.to_dict() if self.image else None,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
