import { Mail, Phone } from 'lucide-react'
import styles from './auth.module.css'
const Card1 = ({active}:{active: number}) => {
  return (
    <div className={`${styles.card} ${active === 0 ?styles.show:styles.hide} ${styles['card-1']}`}>
        <h2 className={styles['card-title']}>Reduce no-shows and stay on track</h2>
        <div className={styles['work-flow']}>
            <div className={styles['flow']}>
                <h5 className={styles.pin}>Workflow</h5>
                <Phone size={40} color='#2563eb' />
                <h4 className={styles['work-flow-header']}>Send Notify</h4>
                <div className={styles['flow-detail']}>
                    24 hours before event starts
                </div>
                <div className={styles['flow-action']}>
                    <Phone size={20} color='#2563eb' />
                    Send notify to invitees
                </div>
            </div>

            <div className={styles['flow']}>
                <h5 className={styles.pin}>Workflow</h5>
                <Mail size={40} color='#2563eb' />
                <h4 className={styles['work-flow-header']}>Send follow-up email</h4>
                <div className={styles['flow-detail']}> 
                    2 hours after event ends
                </div>
                <div className={styles['flow-action']}>
                    <Mail size={20} color='#2563eb'/>
                    Send email to invitees
                </div>
            </div>
        </div>
    </div>
  )
}

export default Card1