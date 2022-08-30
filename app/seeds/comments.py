from ..models import db, Comment

def seed_comments():
    comment1 = Comment(
        content="SHEEEESH!!", user_id=2, tweet_id=1)
    comment2 = Comment(
        content="Yo those are some fire slippers!", user_id=1, tweet_id=2)
    comment3 = Comment(
        content="I wish my girlfriend would get me a pair of these. #pray", user_id=2, tweet_id=3)
    comment4 = Comment(
        content="Can't wait to take pics with you in these! #fire", user_id=3, tweet_id=4)
    comment5 = Comment(
        content="I think you can buy them on Amazon!", user_id=3, tweet_id=5)

    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
    db.session.add(comment4)
    db.session.add(comment5)

    db.session.commit()


def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()