from .db import db

class Tweet(db.Model):

    __tablename__ = 'tweets'

    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(280), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    likes = db.Column(db.Integer, default=0)
    image_url = db.Column(db.String, nullable=False)
    display_comments = db.Column(db.Boolean, default=True)
    
    user = db.relationship("User", back_populates="tweet")
    comments = db.relationship("Comment", back_populates="tweet", cascade="all, delete-orphan")
    like_list = db.relationship("Like", back_populates="tweet", cascade="all, delete-orphan")


    def to_dict(self):
        return {
            "id": self.id,
            "description": self.description,
            "user": self.user.to_dict(),
            "likes": self.likes,
            "like_list": [like.to_dict() for like in self.like_list],
            "image_url": self.image_url,
            "comments": [comment.to_dict() for comment in self.comments],
            "display_comments": self.display_comments
        }

    def __repr__(self):
        return f"""
            < Tweet ID: {self.id}\n
              Description: {self.description}\n
              User: {self.user.to_dict()}\n
              Likes: {self.likes}\n
              Image URL: {self.image_url} >
            """
