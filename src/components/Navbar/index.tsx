import Icons from "../Icons"
import styles from "../Navbar/NavBar.module.scss"

const NavBar =()=>{
    return(
        <div className={styles.container}>
            <div></div>
            <input placeholder={"Search"} className={styles.searchBar}/>
            <div className={styles.right}>
                <div className={styles.userIcon}>
                    <Icons icon="userIcon"/>
                    Guest!
                </div>
            </div>
        </div>
    )
}

export default NavBar