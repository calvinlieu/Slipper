from .db import db

class Comment(db.Model):
    __tablename__ = 'comments'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String(280), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    tweet_id = db.Column(db.Integer, db.ForeignKey('tweets.id', ondelete="CASCADE"), nullable=False)
    likes = db.Column(db.Integer, default=0)
    
    tweet = db.relationship("Tweet", back_populates="comments")
    user = db.relationship("User", back_populates="comments")
    like_list = db.relationship("Like", back_populates="comment", cascade="all, delete-orphan")
    

    def to_dict(self):
        return {
            "id": self.id,
            "content": self.content,
            "user": self.user.to_dict(),
            "tweet": self.tweet_id,
            "likes": self.likes
        }


        