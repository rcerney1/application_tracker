from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import CoverLetter, CoverLetterImage, db
from app.forms import CoverLetterForm, CoverLetterImageForm

cover_letter_routes = Blueprint('cover_letters', __name__)

# Get all cover letters for the current user
@cover_letter_routes.route('/')
@login_required
def get_cover_letters():
    page = request.args.get('page', 1, type=int)
    limit = request.args.get('limit', 6, type=int)

    query = CoverLetter.query.filter(CoverLetter.user_id == current_user.id)

    total_count = query.count()
    cover_letters = query.offset((page - 1) * limit).limit(limit).all()

    return jsonify({
        'cover_letters': [cover_letter.to_dict() for cover_letter in cover_letters],
        'total_count': total_count,
        'page': page,
        'limit': limit
    })


# Get a cover letter by ID
@cover_letter_routes.route('/<int:id>')
@login_required
def get_cover_letter(id):
    cover_letter = CoverLetter.query.get(id)
    if not cover_letter:
        return jsonify({'errors': {'message': 'Cover letter not found'}}), 404
    if cover_letter.user_id != current_user.id:
        return jsonify({'errors': {'message': 'Unauthorized'}}), 401
    cover_letter_data = cover_letter.to_dict()
    if(cover_letter.image):
        cover_letter_data['image'] = cover_letter.image.to_dict()

    return jsonify(cover_letter_data)


# Create a cover letter
@cover_letter_routes.route('/', methods=['POST'])
@login_required
def create_cover_letter():
    form = CoverLetterForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        application_id = form.data['application_id']
        cover_letter = CoverLetter(
            title=form.data['title'],
            application_id=form.data.get('application_id'),
            user_id=current_user.id
        )
        db.session.add(cover_letter)
        db.session.commit()
        return jsonify(cover_letter.to_dict())
    return jsonify({'errors': form.errors}), 400


# Update a cover letter
@cover_letter_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_cover_letter(id):
    cover_letter = CoverLetter.query.get(id)
    if not cover_letter:
        return jsonify({'errors': {'message': 'Cover letter not found'}}), 404
    if cover_letter.user_id != current_user.id:
        return jsonify({'errors': {'message': 'Unauthorized'}}), 401

    form = CoverLetterForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        cover_letter.title = form.data['title']
        cover_letter.application_id = form.data.get('application_id')
        db.session.commit()
        return jsonify(cover_letter.to_dict())
    return jsonify({'errors': form.errors}), 400


# Delete a cover letter
@cover_letter_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_cover_letter(id):
    cover_letter = CoverLetter.query.get(id)
    if not cover_letter:
        return jsonify({'errors': {'message': 'Cover letter not found'}}), 404
    if cover_letter.user_id != current_user.id:
        return jsonify({'errors': {'message': 'Unauthorized'}}), 401
    db.session.delete(cover_letter)
    db.session.commit()
    return jsonify({'message': 'Cover letter deleted successfully'})


# Add an image to a cover letter
@cover_letter_routes.route('/<int:id>/image', methods=['POST'])
@login_required
def add_cover_letter_image(id):
    cover_letter = CoverLetter.query.get(id)
    if not cover_letter:
        return jsonify({'errors': {'message': 'Cover letter not found'}}), 404
    if cover_letter.user_id != current_user.id:
        return jsonify({'errors': {'message': 'Unauthorized'}}), 401

    form = CoverLetterImageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        image = CoverLetterImage(
            cover_letter_id=cover_letter.id,
            file_url=form.data['file_url']
        )
        db.session.add(image)
        db.session.commit()
        return jsonify(image.to_dict())
    return jsonify({'errors': form.errors}), 400


# Update the image for a cover letter
@cover_letter_routes.route('/<int:id>/image', methods=['PUT'])
@login_required
def update_cover_letter_image(id):
    cover_letter = CoverLetter.query.get(id)
    if not cover_letter:
        return jsonify({'errors': {'message': 'Cover letter not found'}}), 404
    if cover_letter.user_id != current_user.id:
        return jsonify({'errors': {'message': 'Unauthorized'}}), 401

    form = CoverLetterImageForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        # If the cover letter doesn't already have an image, create a new one
        if not cover_letter.image:
            new_image = CoverLetterImage(
                cover_letter_id=cover_letter.id,
                file_url=form.data['file_url']
            )
            db.session.add(new_image)
        else:
            # Update the existing image
            cover_letter.image.file_url = form.data['file_url']

        db.session.commit()
        return jsonify(cover_letter.image.to_dict())

    return jsonify({'errors': form.errors}), 400



# Delete the image from a cover letter
@cover_letter_routes.route('/<int:id>/image', methods=['DELETE'])
@login_required
def delete_cover_letter_image(id):
    cover_letter = CoverLetter.query.get(id)
    if not cover_letter:
        return jsonify({'errors': {'message': 'Cover letter not found'}}), 404
    if cover_letter.user_id != current_user.id:
        return jsonify({'errors': {'message': 'Unauthorized'}}), 401
    if not cover_letter.image:
        return jsonify({'errors': {'message': 'Cover letter does not have an image'}}), 404

    db.session.delete(cover_letter.image)
    db.session.commit()
    return jsonify({'message': 'Cover letter image deleted successfully'})
