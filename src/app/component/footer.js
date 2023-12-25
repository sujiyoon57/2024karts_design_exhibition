import KartsLogo from '/public/asset/kartsLogo2.svg'
import KartsRightMobile from '/public/asset/kartsRightMobile.svg'
import KartsRightWeb from '/public/asset/kartsRightWeb.svg'

export default function Footer(){
    return(
        <footer>
            <span><KartsLogo/></span>
            <span><KartsRightWeb/></span>
            <span><KartsRightMobile/></span>
        </footer>
    )
}