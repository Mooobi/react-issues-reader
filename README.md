## 프로젝트 소개

이 프로젝트는 원티드 프리온보딩 프론트엔드 12기 과정의 2주차 과제로,  
특정 깃헙 레파지토리(페이스북 리액트)의 이슈 목록과 상세 내용을 확인하는 웹 사이트를 구축하였습니다.

참여자: 박무생

## 폴더 구조
```
root
└── src/
    ├── common/
    │   ├── apis
    │   ├── assets
    │   ├── components
    │   ├── constants
    │   ├── hooks
    │   ├── style
    │   ├── type
    │   └── util
    ├── papes/
    │   ├── detail
    │   ├── main
    │   └── notFount
    ├── App.tsx
    ├── main.tsx
    └── router.tsx
```

## 실행 방법

위 배포 링크를 클릭하여 배포환경에서 실행하거나,
로컬 환경의 터미널에서 clone 후 npm install, npm run dev 순으로 입력하여 로컬환경에서 실행할 수 있습니다.

```
git clone https://github.com/Mooobi/react-issues-reader.git
npm install
npm run dev
```

## 사용 스택

<img src='https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white' alt='html5' />
<img src='https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white' alt='css3' />
<img src='https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white' alt='css3' />
<img src='https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white' alt='ts' />
<img src='https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB' alt='react' />
<img src='https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white' alt='styled_components' />
<img src='https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white' alt='eslint' />
<img src='https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E' alt='prettier' />

## 요구사항
- 이슈 목록 및 상세 화면 기능 구현
- 데이터 요청 중 로딩 표시
- 에러 화면 구현
- 지정된 조건(open 상태, 코멘트 많은 순)에 맞게 데이터 요청 및 표시
1. 이슈 목록 화면
  - 이슈 목록 가져오기 API 활용
  - open 상태의 이슈 중 코멘트가 많은 순으로 정렬
  - 각 행에는 ‘이슈번호, 이슈제목, 작성자, 작성일, 코멘트수’를 표시
  - 다섯 번째 셀마다 광고 이미지 출력
  - 화면을 아래로 스크롤할 시 이슈 목록 추가 로딩(인피니티 스크롤)
2. 이슈 상세 화면
  - 이슈의 상세 내용 표시
  - ‘이슈번호, 이슈제목, 작성자, 작성일, 코멘트 수, 작성자 프로필 이미지, 본문' 표시
3. 공통 헤더
  - 두 페이지는 공통 헤더를 공유합니다.
  - 헤더에는 Organization Name / Repository Name이 표시됩니다.

## 와이어 프레임

![image](https://github.com/Mooobi/wanted-pre-onboarding-12th-2/assets/124570875/12063f3b-a36c-4b93-9f76-518a16a9c83a)

왼쪽이 목록 화면, 오른쪽이 상세 화면

## 구현 화면

![Sep-09-2023 19-55-57](https://github.com/Mooobi/wanted-pre-onboarding-12th-2/assets/124570875/9a252912-638c-47b2-b069-b97825d35958)

## 개발 과정
### 라우팅
react-router-dom의 v6.4에서 나온 새로운 방식의 라우팅을 적용했습니다. createBrowserRouter를 사용한 라우팅인데 공식 문서에서는 이 방식을 사용하는 것을 추천하고, react-router에서 제공하는 새로운 data API들을 사용할 수 있습니다.

App 컴포넌트를 root path로 설정하고 나머지 하위 페이지들의 path를 설정해 주었습니다.

```ts
// Router.tsx
const router = createBrowserRouter([
  {
    path: PATH_MAIN,
    element: <App />,
    children: [
      {
        path: '',
        element: <Main />,
      },
      {
        path: PATH_DETAIL,
        element: <Detail />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);
```

main.tsx에서 RouterProvider를 추가하고

```ts
// main.tsx
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router';
import router from './router.tsx';
import { GlobalStyle } from './common/style/globalStyle.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <GlobalStyle />
    <RouterProvider router={router} />
  </>,
);
```

App 컴포넌트에서 <Outlet> 컴포넌트를 사용하여 부모 경로에서 자식 경로를 렌더링 가능토록 해주었습니다.

```ts
// App.tsx
import { Outlet } from 'react-router-dom';
import Header from './common/components/Header';

export default function App() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
```

### 헤더
App 컴포넌트의 첫 번째 자식 요소로 위치시켜 어느 페이지에서나 렌더링 되도록 하였습니다. Header 컴포넌트의 title을 클릭하면 메인페이지로 전환되도록 구현했습니다.

```ts
// Header.tsx
export default function Header() {
  return (
    <Wrapper>
      <Link to={PATH_MAIN}>
        <div>{`${ORGANIZATION_NAME} / ${REPOSITORY_NAME}`}</div>
      </Link>
    </Wrapper>
  );
}
```

### API
이 서비스는 오로지 읽는 목적이기 때문에 GET요청 말고는 사용하는 http 메서드가 없습니다. 따라서 간단한 get 요청 함수, baseURL 지정을 위한 instance 생성, github API를 무제한으로 호출하기 위한 token을 요청 header에 싣는 interceptor 작업만 해주었습니다.

```ts
// httpService.ts
import axios from 'axios';
import { BASE_URL } from '../constants/constants';

const { VITE_GH_TOKEN } = import.meta.env;

export const httpService = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
});

httpService.interceptors.request.use((config) => {
  if (VITE_GH_TOKEN) {
    config.headers.Authorization = `Bearer ${VITE_GH_TOKEN}`;
  }
  return config;
});
// api.ts
import { httpService } from './httpService';

export const getData = async (url: string) => {
  const res = await httpService.get(url);

  return res;
};
```

### 메인페이지
메인 페이지 컴포넌트는 List 컴포넌트를 보여주는 UI 컴포넌트입니다.

```ts
// Main.tsx
export default function Main() {
  return (
    <Wrapper>
      <List />
    </Wrapper>
  );
}
```

List 컴포넌트는 다음과 같은 역할을 합니다.

- useGetList 훅을 사용해서 list와 fetchData 함수를 가져옵니다. 그리고 useEffect로 첫 렌더링 시에 fetchData 함수를 실행합니다. 
- fetchData가 실행되면 list가 업데이트되고 이 list를 화면에 렌더링 합니다.
- 마지막 Card 컴포넌트 요소를 setTarget을 통해 저장합니다.
- useObserver에서 반환된 entry가 바뀔 때마다 fetchData 함수를 실행합니다. (아래 무한스크롤 부분에서 설명)
- 리스트 중 4번째일 때마다 아래에 AdCard 컴포넌트가 함께 렌더링 됩니다. 즉, 목록의 5번째마다 광고가 붙게 됩니다.
- 로딩중일 때에는 Loading 컴포넌트를 반환하여 UX를 향상하였습니다.

```ts
export default function List() {
  const [isLoading, setIsLoading] = useState(false);
  const { entry, setTarget } = useObserver();
  const { list, fetchData } = useGetList(isLoading, setIsLoading);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (entry && entry.isIntersecting) {
      fetchData();
    }
  }, [entry]);

  return (
    <Wrapper>
      {list?.map((card, index) => (
        <div key={card.id}>
          <Card card={card} ref={list.length - 1 === index ? setTarget : null} />
          {!((index + 1) % CONTENT_COUNT) && <AdCard />}
        </div>
      ))}
      {isLoading && <Loading />}
    </Wrapper>
  );
}
```

### useGetList
fetch 하는 부분은 useGetList에서 구현하였습니다. isFirstpage를 통해 첫 렌더링을 위한 요청인지, 무한스크롤을 위한 요청인지 분기하여 엔드포인트를 다르게 지정해 주었습니다. githubAPI에서 issue 목록을 요청하면 응답 헤더의 link에서 이전페이지, 다음페이지, 첫 페이지, 마지막페이지에 대한 url을 넘겨줍니다. 이 과제의 경우 무한스크롤이므로 다음페이지에 대한 정보만을 받아 첫 렌더링이 아닐 경우 다음 페이지 url을 parseUrl 함수를 통해 파싱 하여 트리거가 작동하면(list 페이지의 두 번째 useEffect로 entry가 변할 때마다) 다음 페이지를 요청하도록 만들었습니다.

또한 isLoading으로 로딩 여부를 반환하여 List 컴포넌트에서 로딩 여부를 사용할 수 있게 하였습니다.

```ts
// useGetList.tsx
export default function useGetList(
  isLoading: boolean,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
) {
  const [list, setList] = useState<ListType>([]);
  const [isFirstPage, setIsFirstPage] = useState(true);
  const [url, setUrl] = useState('');

  const fetchData = useCallback(async () => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      const fetchUrl = isFirstPage
        ? `/repos/${ORGANIZATION_NAME}/${REPOSITORY_NAME}/issues?sort=comments`
        : `${url}&sort=comments`;

      const result = await getData(fetchUrl);
      const nextUrl = parseUrl(result.headers.link as string);
      setUrl(nextUrl as string);
      setList((prevList) => [...prevList, ...result.data]);
      setIsFirstPage(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, setIsLoading, isFirstPage, url]);

  return { list, fetchData, isLoading };
}
```

### useObserver
무한스크롤을 구현하기 위해 intersectionObserver를 사용하였는데, useObserver 훅에서 무한스크롤 구현 로직을 담당하여 특정 컴포넌트를 관찰하는 역할을 합니다. List 컴포넌트에서 target이 설정되면, intersectionObserver가 해당 요소를 관찰합니다(이 과제의 경우 제일 마지막 Card 컴포넌트입니다.). 그러다 target이 화면에 나타나면 entry를 변경하게 됩니다. 여기서 entry가 변하였으므로 List 컴포넌트의 두 번째 useEffect가 실행되고, 이에 따라 다음페이지에 대한 fetchData 함수가 실행되어 화면에 렌더링 됩니다.

```ts
// useObserver.tsx
export default function useObserver() {
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const [target, setTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!target) {
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      setEntry(entry);
    });

    observer.observe(target);

    return () => {
      observer.unobserve(target);
      observer.disconnect();
    };
  }, [target]);

  return { entry, setTarget };
}
```

상세페이지
상세페이지에서는 단순히 데이터 요청 후 렌더링하는 과정밖에 없습니다. useGetDetail 훅을 통하여 단일 항목을 받아온 후 화면에 렌더링 하도록 구현하였습니다. useGetDetail 훅은 위의 useGetList 훅에서 무한스크롤에 따른 분기만 없애준 훅이므로 별도의 설명은 하지 않겠습니다.

```ts
// Detail.tsx
export default function Detail() {
  const [isLoading, setIsLoading] = useState(false);
  const { number: issueNumber } = useParams();

  const { detail } = useGetDetail(issueNumber as string, isLoading, setIsLoading);

  return detail ? (
    <Wrapper>
      <Header>
        <Avatar src={detail.user.avatar_url} />
        <Container>
          <TitleSection>{`#${detail.number} ${detail.title}`}</TitleSection>
          <AuthorSection>{`${AUTHOR}: ${detail.user.login} ${CREATED_AT}: ${getDate(
            detail.created_at,
            detail.updated_at,
          )}`}</AuthorSection>
        </Container>
        <CommentSection>{`${COMMENT} ${detail.comments}`}</CommentSection>
      </Header>
      <Article>
        <MarkdownRenderer content={detail?.body as string} />
      </Article>
    </Wrapper>
  ) : (
    <Loading />
  );
}
```
