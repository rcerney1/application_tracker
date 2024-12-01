from .db import db, environment, SCHEMA, add_prefix_for_prod

class Application(db.Model):
    __tablename__ = 'applications'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    status = db.Column(db.Integer, nullable=False)
    description = db.Column(db.Text, nullable=True)
    website_url = db.Column(db.String(255), nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    company_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('companies.id')), nullable=True)
    created_at = db.Column(db.DateTime, nullable=False, default=db.func.now())
    updated_at = db.Column(db.DateTime, nullable=False, default=db.func.now(), onupdate=db.func.now())

    # Relationships
    user = db.relationship("User", back_populates="applications")
    company = db.relationship("Company", back_populates="applications")
    cover_letters = db.relationship("CoverLetter", back_populates="application", cascade="all, delete-orphan")


    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "status": self.status,
            "description": self.description,
            "website_url": self.website_url,
            "user_id": self.user_id,
            "company_id": self.company_id,
            "company": self.company.to_dict() if self.company else None,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
