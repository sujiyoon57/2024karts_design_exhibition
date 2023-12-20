import KartsLogo from '/public/asset/karts_logo_gray.svg'
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