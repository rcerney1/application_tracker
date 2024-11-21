from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Company

company_routes = Blueprint('companies', __name__)

# Get all companies
@company_routes.route('/', methods=['GET'])
@login_required
def get_companies():
    companies = Company.query.all()
    return jsonify({'companies': [company.to_dict() for company in companies]})
