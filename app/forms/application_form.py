from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField, URLField
from wtforms.validators import DataRequired, NumberRange, Optional, URL

class ApplicationForm(FlaskForm):
    title = StringField('title', validators=[DataRequired()])
    status = IntegerField('status', validators=[DataRequired(), NumberRange(min=1, max=4)])
    description = TextAreaField('description', validators=[Optional()])
    website_url = URLField('website_url', validators=[Optional(), URL()])
    company_id = IntegerField('company_id', validators=[DataRequired()])
