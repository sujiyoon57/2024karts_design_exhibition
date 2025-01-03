import KartsLogo from '/public/asset/kartsLogo2.svg'
import KartsRightMobile from '/public/asset/kartsRightMobile.svg'
import KartsRightWeb from '/public/asset/kartsRightWeb.svg'

export default function Footer(){
    return(
        <footer>
            <div>
                <span><KartsLogo/></span>
                <span>석관동캠퍼스 본부동 (02789)<br />서울특별시 성북구 화랑로32길 146-37</span>
            </div>
            <p>Copyright(C) Korea National University of Arts Design Dept. All rights reserved</p>
        </footer>
    )
}