import styles from './Logo.module.scss';

export default function Logo({ handleClick }) {
return (
  <div className={styles.Logo} onClick={handleClick}>
    <div>YE OLDE</div>
    <div>CURIOSITY SHOPPE</div>
  </div>
);
}