import { Clock, Globe2, Video } from 'lucide-react'
import Image from 'next/image'
import CustomCalendar from '../../CustomCalendar/CustomCalendar'
import styles from './auth.module.css'
const Card2 = ({active} : {active: number}) => {

    const day = new Date()

    function getDayOfWeek():string{
        const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
        return days[day.getDay()]
    }
    const dayOfWeek = getDayOfWeek()

  return (
    <div className={`${styles.card} ${active === 1? styles.show: styles.hide} ${styles['card-2']}`}>
        <h2 className={styles['card-title']}>Share your booking page</h2>
        <div className={styles.wrapper}>
            <div className={styles['left-card']}>
                <div className={styles['left-title']}>
                    <Image src='/image-logo.png' width={40} height={40} alt='image' className={styles.logo}/>
                    ACME Inc.
                </div>

                <div className={styles.infor}>
                    <div className={styles['person-infor']}>
                        <div className={styles.dividers}>
                            <Image src='/google-logo.png' 
                            width={40} height={40} alt='person' className={styles['image-person']} />
                        </div>
                        <p>Fatima Sy</p>
                        <h2>Client Check-in</h2>
                    </div>
                    <div className={styles['meeting-infor']}>
                        <div className={styles.time}>
                            <Clock size={25}/>
                            30 min
                        </div>
                        <div className={styles['plat-form']}>
                            <Video size={25} />
                            zoom
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles['middle-card']}>
                <div className={styles['middle-title']}>
                    Select a Date & Time
                </div>
                <CustomCalendar />
                <div className={styles['middle-footer']}>
                    <span className={styles['footer-title']}>Time zone</span>
                    <div className={styles['time-zone']}>
                        <Globe2 />
                        <select className={styles['select-time-zone']}>
                            <option>Eastern time - US & Canada</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className={styles['right-card']}>
                <div className={styles.date}>{`${dayOfWeek}, ${day.getMonth()}, ${day.getFullYear()}`}</div>
                <div className={styles.grid}>
                    <button>10:00am</button>
                    <button className={styles.actives}>11:00am</button>
                    <button className={styles.confirms}>Confirm</button>
                    <button>1:00pm</button>
                    <button>2:30pm</button>
                    <button>4:00pm</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Card2