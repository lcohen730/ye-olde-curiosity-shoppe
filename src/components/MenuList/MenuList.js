import styles from './MenuList.module.scss';
import MenuListItem from '../MenuListItem/MenuListItem';

export default function MenuList({ menuItems, handleAddToOrder, setMenuItems }) {
  const items = menuItems.map(item =>
    <MenuListItem
      key={item._id}
      handleAddToOrder={handleAddToOrder}
      menuItem={item}
      setMenuItems={setMenuItems}
      menuItems={menuItems}
    />
  );
  return (
    <main className={styles.MenuList}>
      {items}
    </main>
  );
}