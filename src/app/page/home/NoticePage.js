export default function NoticePage({ notices }) {
    /*
    * 2025.12
    * scrollup이 아무 역할도 하지 않고 있음.
    * -> 주석처리
    * */
  // const [scrollup, setScrollup] = useState(false);
  // useEffect(() => {
  //   const aboutTimeout = setTimeout(() => {
  //     setScrollup(true);
  //   }, 5000);
  //   return () => {
  //     clearTimeout(aboutTimeout);
  //   };
  // }, []);

    return(
        <div className="main-notice"> 
            <h3>공지사항</h3>
            <ul className="notice_list">
              {notices.length > 0 ? (
                notices.map((data, index) => (
                  <li key={index}>
                    <a href={`/page/notice_view/${index}`}>
                      <div className="notice-info">
                      <div
                        className={
                          data.fields.part2.includes("학과")
                            ? "type01"
                            : data.fields.part2.includes("행사")
                            ? "type02"
                            : data.fields.part2.includes("채용")
                            ? "type03"
                            : data.fields.part2.includes("기타")
                            ? "type04"
                            : ""
                        }
                      >{data.fields.part2}</div>
                        <div>{data.fields.title}</div>
                        <div>{data.sys.createdAt.substr(0, 10)}</div>
                      </div>
                    </a>
                  </li>
                ))
              ) : (
                <li>공지사항이 없습니다.</li>
              )}
            </ul>
            <a href="/page/notice" className="more">전체 보기</a> 
        </div>
    )
}
