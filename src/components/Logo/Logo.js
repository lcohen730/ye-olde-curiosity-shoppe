import styles from './Logo.module.scss';

// pass boolean as props, default false
export default function Logo({ home = false }) {
return (
  // ternary to switch between home and other logo
  <div className={`${styles.Logo} ${home ? styles.largeLogo : styles.smallLogo}`}>
    {/* { home ? <div>YE OLDE</div> : <div>YE OLDE</div> } */}
    <div>YE OLDE</div>
    <div>CURIOSITY SHOPPE</div>
  </div>
);
}