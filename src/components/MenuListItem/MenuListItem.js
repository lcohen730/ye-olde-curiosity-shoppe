import styles from './MenuListItem.module.scss';

export default function MenuListItem({ menuItem, handleAddToOrder }) {
  return (
    <div className={styles.MenuListItem}>
      {/* <div className={styles.emoji + ' ' + 'flex-ctr-ctr'}>{menuItem.image}</div> */}
      {/* <div className={styles.emoji + ' ' + 'flex-ctr-ctr'}> */}
      <div>
        {/* <img src='/Users/lauracohen/portfolio-projects/projects/unit-3-project/public/img/siamese-twins-skeleton.jpeg' alt='siamese' /> */}
        <img className={styles.emoji} src={menuItem.image} />
      </div>
      <div className={styles.name}>{menuItem.name}</div>
      <div className={styles.buy}>
        <span>${menuItem.price.toFixed(2)}</span>
        <button className="btn-sm" onClick={() => handleAddToOrder(menuItem._id)}>
          ADD
        </button>
        {/* Source for stars: https://stackoverflow.com/questions/44409491/css-star-outline */}
        <div className={styles.rating}>
          <span>☆</span>
          <span>☆</span>
          <span>☆</span>
          <span>☆</span>
          <span>☆</span>
        </div>
      </div>
    </div>
  );
}