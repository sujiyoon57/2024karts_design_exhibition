import { createClient } from 'contentful';

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
export const fetchContentful = async (contentType, revalidate, year = null) => {
    try {
      const query = { content_type: contentType };
  
      // year 필터 쓰고 있다면 그대로 유지
      if (year !== null && year !== undefined) {
        query['fields.NEWexhibitionYear'] = year;
      }
  
      console.log('🧪 Contentful query:', query);


      /*
      * 2025.12
      * getEntries방식은 NextJS가 캐싱하지 못함.
      * NextJs가 데이터를 캐싱할 수 있도록 직접 cdn으로 가져오는 방식으로 변경
      * */
      // const res = await client.getEntries(query);
        const SPACE_ID = process.env.NEXT_PUBLIC_SPACE_ID;
        const ACCESS_TOKEN = process.env.NEXT_PUBLIC_ACCESS_TOKEN;
        const url = `https://cdn.contentful.com/spaces/${SPACE_ID}/entries?content_type=${contentType}&include=10`;
        const res = await fetch(url, {
            headers: {
                Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
            next: {
                cache: "force-cache",
                revalidate: revalidate,
            },
        });

      // console.log('🧪 Contentful raw response items length:', res.items?.length);
      // console.log(
      //   '🧪 Contentful first item:',
      //   JSON.stringify(res.items?.[0]?.fields, null, 2)
      // );

        const data = await res.json();
        const items = resolveAssets(data.items, data.includes);

        return items;
    } catch (error) {
      console.error('❌ Contentful fetch error:', error);
      return [];
    }
  };


/*
* 2025.12
* cdn 방식으로 데이터를 불러올 경우, depth가 있는 데이터는 fields값이 안가져와지는 문제를 해결하기 위한 메서드
* */
function resolveAssets(items, includes) {
    if (!includes?.Asset) return items;

    const assetMap = new Map(
        includes.Asset.map(asset => [asset.sys.id, asset])
    );

    return items.map(item => {
        const fields = { ...item.fields };

        Object.keys(fields).forEach(key => {
            const value = fields[key];

            if (value?.sys?.type === 'Link' && value.sys.linkType === 'Asset') {
                fields[key] = assetMap.get(value.sys.id) ?? value;
            }

            if (Array.isArray(value)) {
                fields[key] = value.map(v => {
                    if (v?.sys?.type === 'Link' && v.sys.linkType === 'Asset') {
                        return assetMap.get(v.sys.id) ?? v;
                    }
                    return v;
                });
            }
        });

        return { ...item, fields };
    });
}
  
