const Item = require('../../models/item');
const Comment = require('../../models/comment');

module.exports = {
  index,
  show,
  addComment
};

async function index(req, res) {
  try{
    const items = await Item.find({}).sort('name').populate('category comments').exec();
    console.log(items)
    // re-sort based upon the sortOrder of the categories
    items.sort((a, b) => a.category.sortOrder - b.category.sortOrder);
    res.status(200).json(items);
  }catch(e){
    res.status(400).json({ msg: e.message });
  }
}

async function show(req, res) {
  try{
    const item = await Item.findById(req.params.id);
    res.status(200).json(item);
  }catch(e){
    res.status(400).json({ msg: e.message });
  }  
}

async function addComment(req, res) {
  try{
    const item = await Item.findById(req.params.id);
    const comment = await Comment.create({
      item: item._id,
      user: req.user._id,
      rating: 5,
      content: req.body.content
    })
    item.comments.addToSet({ _id: comment._id })
    item.save()
    res.status(200).json(comment);
  }catch(e){
    res.status(400).json({ msg: e.message });
  }  
}