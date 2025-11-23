import { createClient } from 'contentful';

// ✅ 환경 변수 확인 로그 추가 (실제 프로덕션 배포 시 제거 추천)
console.log('🔍 NEXT_PUBLIC_SPACE_ID:', process.env.NEXT_PUBLIC_SPACE_ID || '🚨 미설정');
console.log('🔍 NEXT_PUBLIC_ACCESS_TOKEN:', process.env.NEXT_PUBLIC_ACCESS_TOKEN || '🚨 미설정');

// ✅ 환경 변수 유효성 검사 추가
if (!process.env.NEXT_PUBLIC_SPACE_ID || !process.env.NEXT_PUBLIC_ACCESS_TOKEN) {
    console.error('❌ Contentful 환경 변수가 누락되었습니다. .env.local 파일을 확인하세요.');
    throw new Error('Contentful API 키가 설정되지 않았습니다.');
}

// ✅ Contentful 클라이언트 생성 (환경 변수 유효성 검사 후 실행)
export const client = createClient({
    space: process.env.NEXT_PUBLIC_SPACE_ID,
    accessToken: process.env.NEXT_PUBLIC_ACCESS_TOKEN,
});

// ✅ Contentful 데이터 가져오기 함수
export const fetchContentful = async (contentType, year = null) => {
    try {
        const query = { content_type: contentType };

        // ✅ 연도(year) 필터링 (year 값이 유효할 때만 적용)
        if (year !== null && year !== undefined) {
            query["fields.NEWexhibitionYear"] = year;
        }
        
        const res = await client.getEntries(query);
        
        return res.items;
    } catch (error) {
        console.error('❌ Contentful 데이터 불러오기 실패:', error.message);
        return [];
    }
};
