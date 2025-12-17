import { getEntries } from "@/app/contentful/contentful";
import Notice from "@/app/page/notice/Notice";

export default async function NoticePage() {
  const notices = await getEntries("notice", 300); //5분 캐싱

  return (
    <Notice notices={notices}/>
  );
}