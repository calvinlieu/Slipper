from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import DataRequired

class ProfileEditForm(FlaskForm):
    username = StringField("Username", validators=[DataRequired()])
    website = StringField("Website")
    bio = TextAreaField("Bio")
    email = StringField("Email", validators=[DataRequired()])
    phone_number = StringField("Phone Number")
    profile_image_url = StringField("Profile Image URL")
