import { AlignJustify, Bell, BookOpen, Code, Copyright, FileText, MessageCircle, Star, Users } from 'lucide-react'
import styles from '../NavMenu.module.css'
const ResourcesMenuDetail = ({active, onMouseEnter}:{
  active: string,
  onMouseEnter: (menuName: string) => void
}) => {

  const items = [
    {icon: BookOpen, label:"Help Center"},
    {icon: Code, label: "API & Developer tools"},
    {icon: Users, label: "Calendly Community"},
    {icon: Bell, label: "Newsroom"},
    {icon: MessageCircle, label: "Contact us"}
  ]

  return (
    <div className={`${styles['menu-detail-container']} ${active === 'resources' ? styles.active : ''}`}>
        <div onMouseEnter={() => onMouseEnter('')} className={styles.overlay} ></div>
        
        <div className={styles['menu-detail-content']}>
          <div className={`${styles['detail-1']} ${styles['menu-detail']}`}>
              <h3 className={styles['menu-content-header']}>Explore</h3>

              <div className={styles['menu-content-body']}>

                <div className={styles['menu-content-body-item']}>
                  <Star size={40} color='#0066FF' strokeWidth={2} className={styles.icon} />
                  
                  <div className={styles.content}>
                    <h4 className={styles['item-header']}>Customer stories</h4>
                    <p className={styles['item-subtext']}>See how businesses are growing with calendly</p>
                  </div>
                </div>

                <div className={styles['menu-content-body-item']}>
                  <AlignJustify size={40} color='#0066FF' strokeWidth={2} className={styles.icon} />

                  <div className={styles.content}>
                    <h4 className={styles['item-header']}>Blog</h4>
                    <p className={styles['item-subtext']}>Read the latest product and company news</p>
                  </div>
                </div>

                <div className={styles['menu-content-body-item']}>
                  <FileText size={40} color='#0066FF' strokeWidth={2} className={styles.icon} />
                  
                  <div className={styles.content}>
                    <h4 className={styles['item-header']}>Resource library</h4>
                    <p className={styles['item-subtext']}>access ebooks, webinars, guides, videos, and more</p>
                  </div>
                </div>

                <div className={styles['menu-content-body-item']}>
                  <Copyright size={40} color='#0066FF' strokeWidth={2} className={styles.icon} />

                  <div className={styles.content}>
                    <h4 className={styles['item-header']}>About us</h4>
                    <p className={styles['item-subtext']}>Discover out mission and commitment to customers</p>
                  </div>
                </div>
              </div>
          </div>
          <div className={`${styles['detail-2']} ${styles['menu-detail']}`}>
              <h3 className={styles['menu-content-header']}>Learn & connect</h3>

              <div className={styles['resource-features-container']}>
                {items.map((item) =>{
                  const Icon = item.icon
                  return (
                    <div className={styles['features-item']} key={item.label}>
                      <Icon />
                      <span className={styles['features-name']}>{item.label}</span>
                    </div>
                  )
                })}
              </div>
          </div>
        </div>
    </div>
  )
}

export default ResourcesMenuDetail