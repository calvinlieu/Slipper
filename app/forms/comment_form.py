from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Length
# img url, userId, caption

class CommentForm(FlaskForm):
  user_id = IntegerField("User_id", validators=[DataRequired()])
  tweet_id = IntegerField("Tweet_id", validators=[DataRequired()])
  content = StringField("Content", validators=[DataRequired(), Length(min=4, max=280, message="A Tweet must consist of 4 to 280 characters!")])