import Image from 'next/image'
import styles from './Header.module.css'
const Logo = () => {
  return (
    <div className={styles.logo}>
        <Image src='/facebook-logo.png' width={50} height={50} alt='logo'/>
        <div className={styles.name}>Calendy</div>
    </div>
  )
}

export default Logo