
import styles from './NavMenu.module.css'
import Pricing from './Pricing'
import ProductionMenu from './ProductionMenu/ProductionMenu'
import ResourcesMenu from './ResourcesMenu/ResourcesMenu'
import SolutionsMenu from './SolutionsMenu/SolutionsMenu'

    const NavMenu = ({active, onMouseEnter}) => {

    return (
        <div className={styles.category}>
            <div onMouseEnter={() => onMouseEnter('production')}>
                <ProductionMenu active={active}/>
            </div>
            <div onMouseEnter={() => onMouseEnter('solutions')}>
                <SolutionsMenu active={active} />
            </div>
            <div onMouseEnter={() => onMouseEnter('resources')}>
                <ResourcesMenu active={active} />
            </div>
            <div>
                <Pricing />
            </div>
        </div>
    )
    }

    export default NavMenu