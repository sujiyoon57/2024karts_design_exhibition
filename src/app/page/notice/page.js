import { fetchContentful } from "@/app/contentful/contentful";
import Notice from "@/app/page/notice/Notice";

export default async function NoticePage() {
  const notices = await fetchContentful("notice");

  return (
    <Notice notices={notices}/>
  );
}