import Footer from "./Footer";
import Navbar from "./Navbar";
import './Layout.css';

export default function Layout({ children }) {
    return (
        <>

            <div className="layout">
                <Navbar />
               <main style={{ minHeight: "70vh" }}>{children}</main>
                <Footer />
            </div>
        </>
    )
}