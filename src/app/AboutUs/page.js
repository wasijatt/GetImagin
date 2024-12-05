import SecondHero from "../Components/SecondHero"
import Aboutus from "../Components/Aboutus"
import Header from "../Components/Header"
const Page = () => {

    return (
        <div>
            <Header/>
            <SecondHero sfhead={"Top-Tier Creative Designer & Developers."} />
            <Aboutus />
           
        </div>
    )
}

export default Page
