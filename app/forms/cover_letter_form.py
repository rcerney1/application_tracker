from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Optional

class NullableIntegerField(IntegerField):
    def process_formdata(self, valuelist):
        if valuelist and valuelist[0]:
            try:
                self.data = int(valuelist[0])
            except ValueError:
                self.data = None
        else:
            self.data = None

class CoverLetterForm(FlaskForm):
    title = StringField('title', validators=[DataRequired()])
    application_id = NullableIntegerField('application_id', validators=[Optional()])