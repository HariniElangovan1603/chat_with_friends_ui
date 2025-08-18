import Footer from "./Footer";
import Navbar from "./Navbar";

export default function Layout({children}){
    return(
        <>
        <Navbar/>
        <main style={{minHeight:"80vh"}}>{children}</main>
        <Footer/>
        </>
    )
}