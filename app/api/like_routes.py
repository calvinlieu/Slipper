from flask import Blueprint, request
from app.models import db, Comment, Tweet, Like
from app.forms import LikeForm
from flask_login import current_user

likes_routes = Blueprint("likes", __name__, url_prefix="/likes")


@likes_routes.route('/post/<post_id>')
def get_likes(post_id):
    likes = Like.query.filter(Like.post_id == post_id).all()

    return { 'likes': [like.to_dict() for like in likes] }

@likes_routes.route('/', methods=["POST"])
def like():
    if not current_user.is_authenticated: # beginning of error handling(is_authenticated is a boolean not a function)
        return { 'errors': ['Unauthorized, please log in'] }

    form = LikeForm()

    user_id = form.data['user_id']
    tweet_id = form.data['post_id']
    comment_id = form.data['comment_id']

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        if tweet_id and not comment_id:

            all_likes = Like.query.filter(Like.tweet_id == tweet_id).all()

            for like in all_likes:
                if like.user_id == user_id:
                    return "Error: You have already liked this post"

            tweet = Tweet.query.get(tweet_id)
            tweet.likes += 1

            new_like = Like(
                user_id = user_id,
                tweet_id = tweet_id
            )

            db.session.add(new_like)
            db.session.commit()
            return new_like.to_dict()

        elif comment_id and not tweet_id:
            all_likes = Like.query.filter(Like.comment_id == comment_id).all()

            for like in all_likes:
                if like.user_id == user_id:
                    return "Error: You have already liked this comment"

            comment = Comment.query.get(comment_id)
            comment.likes += 1

            new_like = Like(
                user_id = user_id,
                comment_id = comment_id
            )

            db.session.add(new_like)
            db.session.commit()
            return new_like.to_dict()
        else:
            return '400: invalid form entry'


@likes_routes.route('/<like_id>', methods=['DELETE'])
def remove_like(like_id):
    if not current_user.is_authenticated:
        return { 'errors': ['Unauthorized, please log in'] }

    like = Like.query.get(like_id)

    tweet = Tweet.query.get(like.tweet_id)

    tweet.likes -= 1

    db.session.delete(like)
    db.session.commit()

    return "Successfully deleted"