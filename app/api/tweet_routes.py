from flask import Blueprint, request, redirect
from app.models import db, Tweet, Comment, tweet
from app.forms import TweetForm, CommentForm
from flask_login import current_user

tweet_routes = Blueprint("tweets", __name__, url_prefix="/tweets")

#get all tweets
@tweet_routes.route("/", methods=["GET"])
def user_home():
    if (current_user):
        all_tweets = Tweet.query.all()
        tweets = [tweet.to_dict() for tweet in all_tweets]
        response = {"tweets": tweets}
        return response
    else:
        return "Unauthorized User!"


#tweet a tweet
@tweet_routes.route("/", methods=["POST"])
def user_tweet():
    new_tweet = TweetForm()

    new_tweet['csrf_token'].data = request.cookies['csrf.token']
    user_id = new_tweet.data['user_id']
    description = new_tweet.data['description']
    image_url = new_tweet.data['image_url']

    if new_tweet.validate_on_submit() and current_user.id == user_id:
        tweet = Tweet(
            user_id = user_id,
            description = description,
            image_url = image_url
        )
        
        db.session.add(tweet)
        db.session.commit()
        return tweet.to_dict()
    else:
        return '403: Unauthorized User'


# edit a tweet
@tweet_routes.route("/<tweet_id>", methods=["PUT"])
def update_tweet(tweet_id):
    tweet = Tweet.query.get(tweet_id)

    if not tweet:
        return "Error 404: The Tweet you are looking for can not be found!"
    
    updated_tweet = TweetForm()

    updated_tweet['csrf_token'].data = request.cookies['csrf_token']
    description = updated_tweet.data['description']
    image_url = updated_tweet.data['image_url']
    display_comments = updated_tweet.data['display_comments']

    tweet.description = description
    tweet.image_url = image_url
    tweet.display_comments = display_comments

    db.session.commit()
    return tweet.to_dict()

#get a single tweet
@tweet_routes.route("/<tweet_id>", methods=["GET"])
def single_tweet(tweet_id):
    tweet = Tweet.query.get(tweet_id)

    if not tweet:
        return "Error 404: The tweet you are looking for does not exist!"
    
    return tweet.to_dict()

#delete a tweet
@tweet_routes.route("/<tweet_id>", methods=['DELETE'])
def delete_tweet(tweet_id):
    tweet = Tweet.query.get(tweet_id)
    if not tweet:
        return "Error 404: The tweet you are looking for does not exist!"
    
    db.session.delete(tweet)
    db.session.commit()
    
    return "Successfully Deleted"
