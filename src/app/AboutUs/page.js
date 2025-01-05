import SecondHero from "../Components/SecondHero"
import Aboutus from "../Components/Aboutus"
import Header from "../Components/Header"
import Footer from "../Components/Footer"
const Page = () => {

    return (
        <div>
            <Header/>
            <SecondHero sfhead={"Top-Tier Creative Designer & Developers."} />
            <Aboutus />
            <Footer />
           
        </div>
    )
}

export default Page
