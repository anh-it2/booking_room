import { AppWindow, BarChart3, Crown, Globe, Link, Plug, Shield, Smartphone } from 'lucide-react'
import styles from '../NavMenu.module.css'
const ProductionMenuDetail = ({active, onMouseEnter}:{
  active: string,
  onMouseEnter: (menuName: string) => void
}) => {

  const items = [
    {icon: Plug, label: "Integrations"},
    {icon: Crown ,label: "Admin controls"},
    {icon: Smartphone, label: "Mobile app"},
    {icon: Shield, label: "Security"},
    {icon: Globe, label: "Browser extension"},
    {icon: BarChart3, label: "Analytics"}
  ]

  return (
    <div className={`${styles['menu-detail-container']} ${active === 'production' ? styles.active : ''}`}>
        <div onMouseEnter={() => onMouseEnter('')} className={styles.overlay} ></div>\
        
        <div className={styles['menu-detail-content']}>
          <div className={`${styles['detail-1']} ${styles['menu-detail']}`}>
              <h3 className={styles['menu-content-header']}>Product</h3>

              <div className={styles['menu-content-body']}>

                <div className={styles['menu-content-body-item']}>
                  <AppWindow size={40} color='#0066FF' strokeWidth={2} className={styles.icon} />
                  
                  <div className={styles.content}>
                    <h4 className={styles['item-header']}>Scheduling</h4>
                    <p className={styles['item-subtext']}>Simplified booking</p>
                  </div>
                </div>

                <div className={styles['menu-content-body-item']}>
                  <Link size={40} color='#0066FF' strokeWidth={2} className={styles.icon} />

                  <div className={styles.content}>
                    <h4 className={styles['item-header']}>Product overview</h4>
                    <p className={styles['item-subtext']}>Why choose Calendy</p>
                  </div>
                </div>
              </div>
          </div>
          <div className={`${styles['detail-2']} ${styles['menu-detail']}`}>
              <h3 className={styles['menu-content-header']}>Platform</h3>

              <div className={styles['features-grid']}>

                {items.map((item) =>{
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
        </div>
    </div>
  )
}

export default ProductionMenuDetail