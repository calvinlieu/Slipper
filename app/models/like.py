from sqlalchemy import ForeignKey
from .db import db


class Like(db.Model):
    
    __tablename__ = 'likes'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    tweet_id = db.Column(db.Integer, db.ForeignKey('tweets.id'), nullable=True)
    comment_id = db.Column(db.Integer, db.ForeignKey('comments.id'), nullable=True)
   
    user = db.relationship('User', back_populates='likes', foreign_keys=[user_id])
    tweet = db.relationship('Tweet', back_populates='like_list', foreign_keys=[tweet_id])
    comment = db.relationship('Comment', back_populates='like_list')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'user': self.user.to_dict(),
            'tweet_id': self.tweet_id,
            'comment_id': self.comment_id,
        }
