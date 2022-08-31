from flask_wtf import FlaskForm
from wtforms import IntegerField
from wtforms.validators import DataRequired

class LikeForm(FlaskForm):
    user_id = IntegerField("User_id", validators=[DataRequired()])
    tweet_id = IntegerField("Tweet_id")
    comment_id = IntegerField("Comment_id")