import styles from './MenuListItem.module.scss';
import item from '../../../models/itemSchema';
import * as itemsAPI from '../../utilities/items-api';
import { useEffect, useState } from 'react';

export default function MenuListItem({ menuItem, handleAddToOrder, setMenuItems, menuItems }) {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState('');
  const [commentLive, setCommentLive] = useState(false);

  useEffect(function() {
    async function getItems() {
      const items = await itemsAPI.getAll();
      setMenuItems(items);
    }
    getItems();
    setCommentLive(false)
  }, [commentLive]);

  const handleOpen = () => {
    setOpen(!open);
  };

  /* async function handleOpenItem(itemId) {
    await itemsAPI.getById()
  } */

  const handleContent = (evt) => {
    setContent(evt.target.value)
  }

  const handleSubmitComment = async (evt) => {
    evt.preventDefault()
    try {
      const createdComment = await itemsAPI.addComment(menuItem._id, { content });
      const newMenuItem = { ...menuItem };
      newMenuItem.comments.push(createdComment)
      const newMenuItems = menuItems;
      const index = newMenuItems.findIndex((item) => {
        return item._id === menuItem._id
      });
      newMenuItems.splice(index, 1, newMenuItem)
      setMenuItems([...newMenuItems])
      setCommentLive(true)
      console.log('Menu Items: ', menuItems)
    }
    catch (e) {
      console.error(e)
    }
  }

  /* const stars = menuItem.map(star => 
    <div className={styles.rating}>
      {<span>★</span> * item.rating}
      {<span>☆</span> * (5-item.rating)}
    </div>
  ) */

  const filledArr = item.methods.getRating();
  // console.log(filledArr)
  const emptyArr = item.methods.getRatingLeftover();
  // console.log(emptyArr)
  /* let filledStars = [...Array(filledArr)].map((_, i) => <span key={i}>★</span>);
  let emptyStars = [...Array(emptyArr)].map((_, i) => <span key={i}>☆</span>); */
  let filledStars = [...Array(4)].map((_, i) => <span key={i}>★</span>);
  let emptyStars = [...Array(1)].map((_, i) => <span key={i}>☆</span>);
  /* let filledStars = [];
  for (let i = 0; i < filledArr; i++) {
    filledStars[i] = (<span>★</span>);
  }
  let emptyStars = [];
  for (let i = 0; i < emptyArr; i++) {
    emptyStars[i] = (<span>☆</span>);
  } */

  /* const comments = menuItem.map(comment =>
    <div>{{menuItem.comments}.comment}</div>
  ); */

  return (
    <>
      {open ? (
        <div className={styles.MenuListItem}>
          <div className={styles.mainItem}>
            <div>
              <img className={styles.emoji} src={menuItem.image} />
            </div>
            <div className={styles.name} onClick={handleOpen}>{menuItem.name}</div>
            <div className={styles.buy}>
              <span>${menuItem.price.toFixed(2)}</span>
              <button className="btn-sm" onClick={() => handleAddToOrder(menuItem._id)}>
                ADD
              </button>
              {/* Source for stars: https://stackoverflow.com/questions/44409491/css-star-outline */}
              <div className={styles.rating}>
                {filledStars}
                {emptyStars}
              </div>
            </div>
          </div>
          <div className={styles.extraItem}>
            <div className={styles.info}>
              <span>{menuItem.info}</span>
            </div>
            <div className={styles.commentsContainer}>
              <div className={styles.comments}>
                <ul className={styles.commentsTitle}>Comments: {Array.isArray(menuItem.comments) ? menuItem.comments.map((comment) => {
                  return (
                    <li className={styles.comment}>
                      <div className={styles.commentUser}>
                        {comment.user.name} SAYS: <br />
                      </div>
                      <div className={styles.commentContent}>{comment.content}<br /></div>
                      <div className={styles.commentDate}>
                        {comment.date.toLocaleString('en-US')}
                      </div>
                    </li>
                  )
                }) : ''}
                </ul>
              </div>
              <div className={styles.submitComment}>
                <form onSubmit={handleSubmitComment}>
                  <input className={styles.typeComment}type='text' name='content' value={content} onChange={handleContent}></input>
                  <input className={styles.addCommentBtn} type='submit' value='ADD COMMENT'></input>
                </form>
              </div>
            </div>
          </div>
        </div>
      )
        : (
          <div className={styles.MenuListItem}>
            <div className={styles.mainItem}>
              {/* <div className={styles.emoji + ' ' + 'flex-ctr-ctr'}>{menuItem.image}</div> */}
              {/* <div className={styles.emoji + ' ' + 'flex-ctr-ctr'}> */}
              <div>
                {/* <img src='/Users/lauracohen/portfolio-projects/projects/unit-3-project/public/img/siamese-twins-skeleton.jpeg' alt='siamese' /> */}
                <img className={styles.emoji} src={menuItem.image} />
              </div>
              <div className={styles.name} onClick={handleOpen}>{menuItem.name}</div>
              <div className={styles.buy}>
                <span>${menuItem.price.toFixed(2)}</span>
                <button className="btn-sm" onClick={() => handleAddToOrder(menuItem._id)}>
                  ADD
                </button>
                {/* Source for stars: https://stackoverflow.com/questions/44409491/css-star-outline */}
                <div className={styles.rating}>
                  {filledStars}
                  {emptyStars}
                </div>
              </div>
            </div>
          </div>
        )}
    </>
  );
}