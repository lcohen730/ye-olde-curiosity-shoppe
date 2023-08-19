require('dotenv').config();
require('./database');
/* const fs = require('fs');
const path = require('path'); */

const Category = require('../models/category');
const Item = require('../models/item');
/* const Image = require('../models/image'); */
const Comment = require('../models/comment');
const User = require('../models/user');

(async function() {

  await Category.deleteMany({});
  const categories = await Category.create([
    {name: 'Artifacts', sortOrder: 10},
    {name: 'Art', sortOrder: 20},
    {name: 'Clothing', sortOrder: 30},
    {name: 'Accessories', sortOrder: 40},
    {name: 'Books', sortOrder: 50},
  ]);

  await Comment.deleteMany({});
  const comments = await Comment.create([
    { rating: 5, 
      content: 'Perfectly spooky' },
    { rating: 3, content: 'Not spooky enough' },
  ]);

  /* const siameseFilePath = path.resolve('/Users/lauracohen/portfolio-projects/projects/unit-3-project/public/img/siamese-twins-skeleton.jpeg');
  // const siameseFilePath = path.resolve('../public/img/siamese-twins-skeleton.jpeg');
  const siameseImage = new Image({
    image: Buffer.from(fs.readFileSync(siameseFilePath)),
    contentType: "image/jpeg",
  });
  siameseImage.save();
  const siamese = Image.findOne({
    _id: siameseImage._id,
  }); */

  await Item.deleteMany({});
  const items = await Item.create([
    {name: 'Siamese Twin Babies Skeleton', 
      image: 'https://m.media-amazon.com/images/I/71QDzemqufL.jpg', 
      category: categories[0], 
      price: 499.99,
      rating: 4,
      info: 'This item is composed of the bones of the famous Ravenday twins. Legend says they never cried or blinked a single day of their brief lives, only staring into the void.'},
    {name: 'Taxidermy Bat', 
      image: 'https://a.1stdibscdn.com/good-circa-1900-dome-cased-taxidermy-fruit-bat-for-sale/1121189/f_193361921591293029593/19336192_master.jpg?width=768', 
      category: categories[0], 
      price: 59.99,
      rating: 4,
      info: 'Perfect for your coffee table or Halloween, each bat was found in one of a select few unique locations in Eastern Europe. They may have been vampires in their lifetime...we\'ll never tell.'},
    {name: 'Hand of Glory', 
      image: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/93409448-d390-409f-b453-0fa35e42e8bd/dblvbj7-42a75a6f-386e-40d6-b2b8-35a301dbc7f9.jpg/v1/fill/w_774,h_1033,q_70,strp/hand_of_glory_by_gnarledgnome_dblvbj7-pre.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTM2NiIsInBhdGgiOiJcL2ZcLzkzNDA5NDQ4LWQzOTAtNDA5Zi1iNDUzLTBmYTM1ZTQyZThiZFwvZGJsdmJqNy00MmE3NWE2Zi0zODZlLTQwZDYtYjJiOC0zNWEzMDFkYmM3ZjkuanBnIiwid2lkdGgiOiI8PTEwMjQifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.2aVV2pSkM3A8CdoeqO50fTMUGelzWXASKmEE6dRxowQ', 
      category: categories[0], 
      price: 299.99,
      rating: 4,
      info: 'The pickled left hand of Joseph Calverdish who was accused of murdering his wife Daphne in a fit of passionate rage. He was found guilty and hung to death.',
      comments: [ comments[0]._id, comments[1]._id ]},
    {name: 'Monkey\'s Paw',
      image: 'https://img.overdriveonline.com/files/base/randallreilly/all/image/2017/04/ovd.monkeypaw-2017-04-07-09-15.png?auto=format%2Ccompress&fit=max&q=70&w=1200', 
      category: categories[0], 
      price: 0.99,
      rating: 4,
      info: 'The severed paw of a rare Nomascus monkey. Be careful what you wish for...you may just receive it.'},
    {name: 'Ancient Map', 
      image: 'https://images.ctfassets.net/cnu0m8re1exe/7CPAt846Jnnhyy7R3OXWwZ/283ae2cb356b5745b85e2edcdaeae3fa/early-world-map.jpg', 
      category: categories[1], 
      price: 114.99},
    {name: 'Lonely Witch Painting', 
      image: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/bc631589-ee87-4e61-b75c-ac3f33b4266d/d1gzo83-4bcdf62d-e7f2-4af9-b406-895e8058109e.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2JjNjMxNTg5LWVlODctNGU2MS1iNzVjLWFjM2YzM2I0MjY2ZFwvZDFnem84My00YmNkZjYyZC1lN2YyLTRhZjktYjQwNi04OTVlODA1ODEwOWUuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.JGOYTLxpNgsnjwRi1189EO5a2EZ1b9sPN10B6GqSim4', 
      category: categories[1], 
      price: 249.99,
      rating: 4,
      info: 'Self-portrait by local witch, Desdemona Faircroft.'},
    {name: 'Industrial Mixed Medium Wall Art', 
      image: 'https://i.pinimg.com/736x/f0/47/0f/f0470fd94e5b92f8b4575ede3e8bbf60.jpg', 
      category: categories[1], 
      price: 99.99,
      rating: 4,
      info: 'Various works by local artists.'},
    {name: 'Lolita Dress', 
      image: 'https://m.media-amazon.com/images/I/71kaE-c3gYL._AC_UY1000_.jpg', 
      category: categories[2], 
      price: 174.99,
      rating: 4,
      info: 'The perfect outfit for a first date, a poetry reading, or a seance.'},
    {name: 'Black Tuks', 
      image: 'https://www.dollskill.com/cdn/shop/products/8IpMwySLHByDKFebjQ7mbbySOljuO7Gj.jpg?v=1681439289', 
      category: categories[2], 
      price: 79.99,
      rating: 4,
      info: '"I gave birth in these shoes." - Helena Bonham Carter'},
    {name: 'Pendant Necklace', 
      image: 'https://m.media-amazon.com/images/I/71yW-ahRcFL._UF1000,1000_QL80_.jpg', 
      category: categories[3], 
      price: 34.99,
      rating: 4,
      info: 'Perfect to cover up your neck from all of the vampires that definitely live in your neighborhood.'},
    {name: 'Component Pouch', 
      image: 'https://solastacrownofthemagister.wiki.fextralife.com/file/Solasta-Crown-of-the-Magister/standard-component-pouch-tool-solasta-wiki-guide.png', 
      category: categories[3], 
      price: 99.99,
      rating: 4,
      info: 'If you\'re a practicing mage, like LARPing, or want to portray a real-life version of your RPG character, this component pouch is perfect for holding all of your necessary spell materials.'},
    {name: 'Victorian Top Hat', 
      image: 'https://www.thedarkstore.com/30095/black-israfel-victorian-top-hat.jpg', 
      category: categories[3], 
      price: 149.99,
      rating: 4,
      info: 'All outfits look better with a top hat and a monacle. With this hat, you\'re half-way there.'},
    {name: 'Spellbook', 
      image: 'https://cdn.pixabay.com/photo/2022/10/19/11/28/spell-7532162_1280.png', 
      category: categories[4], 
      price: 499.99,
      rating: 4,
      info: 'Every practicing mage needs a good spellbook. Each one of these spellbooks is hand-made, with a leather cover, papyrus pages, and sectioned areas for materials, weather conditions, background, incantations, and other information about your spells.'},
    {name: 'Necronomicon', 
      image: 'https://www.lovecraft-stories.com/img/media/0c21b97583c89d76cbe94a36925163aa.jpg', 
      category: categories[4], 
      price: 2999.99,
      rating: 4,
      info: 'The book of the dead; found near a deceased Englishman who attempted to use the spells within to revive his wife at the site of her exhumed grave. The wife\'s body was never found.'},
  ]);

  console.log(items)

  process.exit();

})();