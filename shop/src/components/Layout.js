import NavBar from "./NavBar";
import styles from '@/styles/Home.module.css'

const Layout = ({ children }) => {
    return (
        <div>
            {/* <Header /> */}
            <NavBar />
            <main className={styles.main}>{children}</main>
            {/* <Footer /> */}
        </div>
    );
};

export default Layout;