from app.models import db, Company, environment, SCHEMA
from sqlalchemy.sql import text

# Seed Data: List of companies
def seed_companies():
    companies = [
        Company(name='Meta', industry='Technology'),
        Company(name='Microsoft', industry='Technology'),
        Company(name='Google', industry='Technology'),
        Company(name='Amazon', industry='E-commerce'),
        Company(name='Apple', industry='Technology'),
        Company(name='Netflix', industry='Entertainment'),
        Company(name='Tesla', industry='Automotive'),
        Company(name='SpaceX', industry='Aerospace'),
        Company(name='Disney', industry='Entertainment'),
        Company(name='Nike', industry='Apparel'),
    ]

    # Add all companies to the session
    for company in companies:
        db.session.add(company)

    db.session.commit()

# Undo Function: Clears the companies table
def undo_companies():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.companies RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM companies"))
        
    db.session.commit()
