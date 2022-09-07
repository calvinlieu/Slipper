from crypt import methods
from flask import Blueprint, redirect, request, jsonify
from app.models import db, Comment
from app.forms import CommentForm
from flask_login import current_user

comment_routes = Blueprint("comments", __name__, url_prefix="/comments")


#edit a comment
@comment_routes.route("/<comment_id>", methods=["PUT"])
def edit_comment(comment_id):
    comment = Comment.query.get(comment_id)
    data = request.json
    comment.content = data["content"]
    db.session.commit()
    return comment.to_dict()


#delete a comment
@comment_routes.route("/<comment_id>", methods=["DELETE"])
def delete_item(comment_id):
    comment = Comment.query.get(comment_id)

    if current_user.id == comment.user_id:

        db.session.delete(comment)
        db.session.commit()
        return "Successfully Deleted"

    else:
        return '404: unauthorized user'
