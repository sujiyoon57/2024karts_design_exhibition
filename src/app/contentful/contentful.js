import { createClient } from 'contentful';

console.log('🔍 NEXT_PUBLIC_SPACE_ID:', process.env.NEXT_PUBLIC_SPACE_ID);
console.log('🔍 NEXT_PUBLIC_ACCESS_TOKEN:', process.env.NEXT_PUBLIC_ACCESS_TOKEN);

export const client = createClient({
  space: process.env.NEXT_PUBLIC_SPACE_ID || '',
  accessToken: process.env.NEXT_PUBLIC_ACCESS_TOKEN || '',
});

export const fetchContentful = async (contentType) => {
  if (!process.env.NEXT_PUBLIC_SPACE_ID || !process.env.NEXT_PUBLIC_ACCESS_TOKEN) {
    console.error('❌ Contentful 환경 변수가 설정되지 않았습니다.');
    return [];
  }

  try {
    const res = await client.getEntries({ content_type: contentType });
    return res.items;
  } catch (error) {
    console.error('❌ Contentful 데이터 불러오기 실패:', error);
    return [];
  }
};
