from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import Application, db
from app.forms import ApplicationForm

application_routes = Blueprint('applications', __name__)

# Get all applications for the current user
@application_routes.route('/')
@login_required
def get_applications():
    applications = Application.query.filter(Application.user_id == current_user.id).all()
    return jsonify({'applications': [app.to_dict() for app in applications]})

# Get an application by ID
@application_routes.route('/<int:id>')
@login_required
def get_application(id):
    application = Application.query.get(id)
    if not application:
        return jsonify({'errors': {'message': 'Application not found'}}), 404
    if application.user_id != current_user.id:
        return jsonify({'errors': {'message': 'Unauthorized'}}), 401
    return jsonify(application.to_dict())

# Create an application
@application_routes.route('/', methods=['POST'])
@login_required
def create_application():
    form = ApplicationForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        application = Application(
            title=form.data['title'],
            status=form.data['status'],
            description=form.data.get('description'),
            website_url=form.data.get('website_url'),
            user_id=current_user.id,
            company_id=form.data.get('company_id') or None
        )
        db.session.add(application)
        db.session.commit()
        return jsonify(application.to_dict())
    return jsonify({'errors': form.errors}), 400

# Update an application
@application_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_application(id):
    application = Application.query.get(id)
    if not application:
        return jsonify({'errors': {'message': 'Application not found'}}), 404
    if application.user_id != current_user.id:
        return jsonify({'errors': {'message': 'Unauthorized'}}), 401

    form = ApplicationForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        application.title = form.data['title']
        application.status = form.data['status']
        application.description = form.data.get('description')
        application.website_url = form.data.get('website_url')
        application.company_id = form.data.get('company_id')
        db.session.commit()
        return jsonify(application.to_dict())
    return jsonify({'errors': form.errors}), 400

# Delete an application
@application_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_application(id):
    application = Application.query.get(id)
    if not application:
        return jsonify({'errors': {'message': 'Application not found'}}), 404
    if application.user_id != current_user.id:
        return jsonify({'errors': {'message': 'Unauthorized'}}), 401
    db.session.delete(application)
    db.session.commit()
    return jsonify({'message': 'Application was deleted successfully'})

# Get summary data for the homepage
@application_routes.route('/summary')
@login_required
def applications_summary():
    total = Application.query.filter_by(user_id=current_user.id).count()
    applied_count = Application.query.filter_by(user_id=current_user.id, status=1).count()
    interviewed_count = Application.query.filter_by(user_id=current_user.id, status=2).count()
    offered_count = Application.query.filter_by(user_id=current_user.id, status=3).count()
    rejected_count = Application.query.filter_by(user_id=current_user.id, status=4).count()

    summary = {
        'total': total,
        'applied': applied_count,
        'interviewed': interviewed_count,
        'offered': offered_count,
        'rejected': rejected_count
    }

    return jsonify({'summary': summary})