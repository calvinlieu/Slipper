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
    tweet6 = Tweet(
        description="These are so comfy!",
        user_id = 3,
        image_url = "https://media.gq.com/photos/5f96fd8a68312a43693ce55c/master/w_2000,h_1333,c_limit/adidas.jpg"
    )
    tweet7 = Tweet(
        description="Bunnies!!!",
        user_id = 2,
        image_url = "https://rs.apolloboxassets.com/images/sku2067-Rabbite-Sliper/arrey-1.jpg"
    )
    tweet8 = Tweet(
        description="Are these still in fashion?",
        user_id = 1,
        image_url = "http://cdn.shopify.com/s/files/1/0231/5727/6752/products/bu4wbjsQrWOJGGiZelkp_Kip_2BCo_AW21_DAYONE_PRODUCT_0396.jpg?v=1599804172"
    )
    tweet9 = Tweet(
        description="Just saw someone wearing these at the mall... OMG!",
        user_id = 3,
        image_url = "https://static01.nyt.com/images/2020/12/24/style/31FUZZY-SLIDES1/31FUZZY-SLIDES1-superJumbo.jpg"
    )
    tweet10 = Tweet(
        description="Can't wait to wear thees in the winter!",
        user_id = 2,
        image_url = "https://content.woolovers.com/img/747x856/59b44-79197_p161b_chestnut_w_20.jpg"
    )
   
    db.session.add(tweet1)
    db.session.add(tweet2)
    db.session.add(tweet3)
    db.session.add(tweet4)
    db.session.add(tweet5)
    db.session.add(tweet6)
    db.session.add(tweet7)
    db.session.add(tweet8)
    db.session.add(tweet9)
    db.session.add(tweet10)


    db.session.commit()

def undo_tweets():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()