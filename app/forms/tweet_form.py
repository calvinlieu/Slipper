from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField
from wtforms.validators import DataRequired

# img url, userId, caption

class TweetForm(FlaskForm):
  user_id = IntegerField("User_id", validators=[DataRequired()])
  image_url = StringField("Image_url")
  description = StringField("Description", validators=[DataRequired()])
  display_comments = BooleanField("Display comments")