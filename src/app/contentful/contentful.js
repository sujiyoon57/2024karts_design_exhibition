import { createClient } from 'contentful';

// ✅ 환경 변수 유효성 검사
if (!process.env.CONTENTFUL_SPACE_ID || !process.env.CONTENTFUL_ACCESS_TOKEN) {
  console.error('❌ Contentful 환경 변수가 누락되었습니다. .env.local 파일을 확인하세요.');
  throw new Error('Contentful API 키가 설정되지 않았습니다.');
}

// ✅ 클라이언트 생성
export const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  environment: process.env.CONTENTFUL_ENVIRONMENT || 'master',
});

// ✅ 데이터 가져오기 함수
export const fetchContentful = async (contentType, year = null) => {
  try {
    const query = { content_type: contentType };

    if (year !== null && year !== undefined) {
      query["fields.NEWexhibitionYear"] = year;
    }

    const res = await client.getEntries(query);

    // ✅ 예외처리 추가
    if (!res || !res.items || res.items.length === 0) {
      console.warn(`⚠️ Contentful에서 ${contentType}에 대한 데이터를 찾을 수 없습니다.`);
      return [];
    }

    // ✅ 안전하게 fields만 추출
    return res.items.map((item) => item.fields);
  } catch (error) {
    console.error('❌ Contentful 데이터 불러오기 실패:', error.message);
    return [];
  }
};
