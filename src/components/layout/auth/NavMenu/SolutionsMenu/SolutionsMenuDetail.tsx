import { GraduationCap, Handshake, Megaphone, Monitor, Search, Sparkle, Target, User, UserPlus, Users } from 'lucide-react'
import styles from '../NavMenu.module.css'
const SolutionsMenuDetail = ({active, onMouseEnter}:
  {
    active: string,
    onMouseEnter: (menuName: string) => void
  }
) => {

    const team = [
        {icon: Target, label: 'Sales'},
        {icon: Megaphone, label: 'Marketing'},
        {icon: Sparkle, label: "Customer success"},
        {icon: Search, label: "Recruiting"},
    ]

    const industry =[
        {icon: GraduationCap, label: "Education"},
        {icon: Monitor, label: "Technology"},
        {icon: Handshake, label: "Financial Services "},
        {icon: Users, label: "Professional Services"}
    ]

  return (
    <div className={`${styles['menu-detail-container']} ${active === 'solutions' ? styles.active : ''}`}>
        <div onMouseEnter={() => onMouseEnter('')} className={styles.overlay} ></div>
        
        <div className={styles['menu-detail-content']}>
          <div className={`${styles['detail-1']} ${styles['menu-detail']}`}>
              <h3 className={styles['menu-content-header']}>By business size</h3>

              <div className={styles['menu-content-body']}>

                <div className={styles['menu-content-body-item']}>
                  <User size={40} color='#0066FF' strokeWidth={2} className={styles.icon} />
                  
                  <div className={styles.content}>
                    <h4 className={styles['item-header']}>Individuals</h4>
                    <p className={styles['item-subtext']}>For Solopreneurs</p>
                  </div>
                </div>

                <div className={styles['menu-content-body-item']}>
                  <UserPlus size={40} color='#0066FF' strokeWidth={2} className={styles.icon} />

                  <div className={styles.content}>
                    <h4 className={styles['item-header']}>Small business</h4>
                    <p className={styles['item-subtext']}>For growing businesses</p>
                  </div>
                </div>

                <div className={styles['menu-content-body-item']}>
                  <Users size={40} color='#0066FF' strokeWidth={2} className={styles.icon} />

                  <div className={styles.content}>
                    <h4 className={styles['item-header']}>Large companies</h4>
                    <p className={styles['item-subtext']}>For enterprise</p>
                  </div>
                </div>
              </div>
          </div>
          <div className={`${styles['detail-2']} ${styles['menu-detail']}`}>

            <div className={styles['solution-menu']}>
              <div className={styles['solution-for-team']}>
                <h3 className={styles['menu-content-header']}>By Team</h3>

                <div className={styles['solution-for-team-container']}>
                    {team.map((item) => {
                        const Icon = item.icon
                        return (
                            <div key={item.label} className={styles['features-item']}>
                                <Icon />
                                <span className={styles['features-name']}>{item.label}</span>
                            </div>
                        )
                    })}
                </div>
              </div>

              <div className={styles['solution-for-industry']}>
                <h3 className={styles['menu-content-header']}>By Industry</h3>

                {industry.map((item) => {
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
    </div>
  )
}

export default SolutionsMenuDetail