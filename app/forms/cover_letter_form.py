from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Optional

class CoverLetterForm(FlaskForm):
    title = StringField('title', validators=[DataRequired()])
    application_id = IntegerField('application_id', validators=[Optional()])
