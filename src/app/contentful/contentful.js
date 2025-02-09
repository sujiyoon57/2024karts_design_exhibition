import { createClient } from 'contentful';

console.log('🔍 NEXT_PUBLIC_SPACE_ID:', process.env.NEXT_PUBLIC_SPACE_ID);
console.log('🔍 NEXT_PUBLIC_ACCESS_TOKEN:', process.env.NEXT_PUBLIC_ACCESS_TOKEN);

export const client = createClient({
  space: process.env.NEXT_PUBLIC_SPACE_ID || '',
  accessToken: process.env.NEXT_PUBLIC_ACCESS_TOKEN || '',
});

export const fetchContentful = async (contentType, year = null) => {
  if (!process.env.NEXT_PUBLIC_SPACE_ID || !process.env.NEXT_PUBLIC_ACCESS_TOKEN) {
      console.error('❌ Contentful 환경 변수가 설정되지 않았습니다.');
      return [];
  }

  try {
      const query = { content_type: contentType };

      // ✅ 연도(year) 필터링을 필드 ID `NEWexhibitionYear`로 변경
      if (year) {
          query["fields.NEWexhibitionYear"] = year; // 필드 ID 수정!
      }

      console.log("🔍 Contentful 요청:", query);
      const res = await client.getEntries(query);
      console.log("📌 Contentful 응답 데이터:", res.items);
      return res.items;
  } catch (error) {
      console.error('❌ Contentful 데이터 불러오기 실패:', error);
      return [];
  }
};
