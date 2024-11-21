from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired, URL, ValidationError

class CoverLetterImageForm(FlaskForm):
    file_url = StringField('file_url', validators=[DataRequired(), URL()])
