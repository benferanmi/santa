import Footer from "../components/layouts/Footer"
import Header from "../components/layouts/Header"

const AppLayout = ({ children }) => {

    return (
        <div>
            <div>
                <Header />
            </div>
            <div>{children}</div>

            <div><Footer /></div>
        </div>
    )
}

export default AppLayout