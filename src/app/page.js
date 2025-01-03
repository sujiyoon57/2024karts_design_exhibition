"use client"
import MainPage from './page/mainPage/mainPage';
import MainSlider from './page/mainPage/mainSlider';
import NoticePage from './page/mainPage/noticePage';
import BannerPage from './page/mainPage/bannerPage';
import Designer from './page/designer/designer';

export default function Home() {


  return (
    <div className='layout-container'>
      <MainSlider/>
      <NoticePage/>
      <BannerPage/>
    </div>
  )
}

// const [scrollup, setScrollup] = useState(false);
// onWheel={(e) => onScroll()}
// const onScroll = e => {
//  if(scrollup === false) {
//    setScrollup(true);
// }
//  setTimeout(() => {
//      window.scrollTo({
//        top: 0,
//          behavior: 'smooth', // Optional: Adds smooth scrolling effect
//          });
//  }, 10);

     
//  }