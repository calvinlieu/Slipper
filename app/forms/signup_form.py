from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, ValidationError, Length
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired("Username is required!"), username_exists, Length(min=4, message="Username must be at least 4 characters long!")])
    email = StringField('Email', validators=[DataRequired(message="Email is required"), user_exists, Length(max=30, message="Email cannot exceed 30 characters!")])
    password = StringField('password', validators=[DataRequired(message="Password is required"), Length(min=8, message="Password must contain at least 8 characters")])
