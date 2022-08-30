from email.mime import image
from pydoc import describe
from ..models import db, Tweet

def seed_tweets():
    tweet1 = Tweet(
        description="You won't believe what just happened to my new slippers!",
        user_id = 1,
        image_url = "https://m.media-amazon.com/images/I/61DdplC8eRL._AC_UY535_.jpg"
    )
    tweet2 = Tweet(
        description="Just copped these new slippers from aliexpress!",
        user_id = 2,
        image_url = "https://cdn.shopify.com/s/files/1/0635/6769/1994/products/Purple_mo-dou-zapatillas-con-forma-de-tiburon-p_variants-1_cleanup_80aab4d0-78d0-4212-89b5-b472c580810f_590x.jpg?v=1655134030"
    )
    tweet3 = Tweet(
        description="These new slippers I got are so comfortable! #comfy",
        user_id = 3,
        image_url = "https://www.thespruce.com/thmb/ga0-GksvaoNmwsTz0kNyHfuqSOk=/1227x818/filters:fill(auto,1)/1SP4079578_HeroHoriz-e87c114462a6401da43184d435824a2e.jpg"
    )
    tweet4 = Tweet(
        description="Can't wait to wear these to Prom! #PromReady",
        user_id = 2,
        image_url = "https://balenciaga.dam.kering.com/m/1f540e154c922d44/eCom-677390W1S8E5300_F.jpg?v=4"
    )
    tweet5 = Tweet(
        description="Does anyone know where I can find these? They look so cool!",
        user_id = 1,
        image_url = "https://m.media-amazon.com/images/I/61ZMAQB5M7L._AC_UX569_.jpg"
    )

    db.session.add(tweet1)
    db.session.add(tweet2)
    db.session.add(tweet3)
    db.session.add(tweet4)
    db.session.add(tweet5)

    db.session.commit()

def undo_tweets():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()