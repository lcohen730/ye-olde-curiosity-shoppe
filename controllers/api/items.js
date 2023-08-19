const Item = require('../../models/item');
const Comment = require('../../models/comment');
const User = require('../../models/user');

module.exports = {
  index,
  show,
  addComment
};

async function index(req, res) {
  try{
    const items = await Item.find({}).sort('name')
      .populate([
        { path : 'category' },
        { path : 'comments',
          populate: { path : 'user' }}
      ]).exec();
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
    const date = new Date();
    const user = await User.findById(req.user._id);
    console.log(user)
    const comment = await Comment.create({
      item: item._id,
      user: user,
      rating: 5,
      content: req.body.content,
      // date: date.toLocaleDateString('en-US')
    })
    const newDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
    comment.date = newDate
    await comment.save()
    console.log(comment)
    await item.comments.addToSet({ _id: comment._id })
    await item.save()
    res.status(200).json(comment);
  }catch(e){
    res.status(400).json({ msg: e.message });
  }  
}