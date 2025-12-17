import MainSlider from "@/app/page/home/MainSlider";
import NoticePage from "@/app/page/home/NoticePage";
import BannerPage from "@/app/page/home/BannerPage";
import {getEntries} from "@/app/contentful/contentful";

export default async function Home() {
    const [banner, poster, noticeData] = await Promise.all([
        getEntries("banner", 10800),
        getEntries("poster", 10800),
        getEntries("notice", 300),
    ]);
    const notices = noticeData
        .sort((a, b) => new Date(b.sys.createdAt) - new Date(a.sys.createdAt))
        .slice(0, 4);

  return (
    <div className='layout-container'>
        <MainSlider poster={poster}/>
        <NoticePage notices={notices}/>
        <BannerPage banner={banner}/>
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