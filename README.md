# pre-onboarding-10th-2-9


검색 기능 구현

proxy 설정

<img width="526" alt="2" src="https://user-images.githubusercontent.com/49917043/236109816-e540beb7-ff47-47d7-96d0-0038f40732c2.png">


전달받은 api로 요청을 보냈을때 위 사진 처럼 CORS에러를 보내주는 것을 확인할 수 있었다. 

백엔드 팀과 함께 팀을 이루어 협의하는 과정이었으면 Access-Control-Allow-Origin 헤더를 수정해달라고 요청하겠지만 이번에는 그럴 수 있는 상황이 아니었기 때문에 프론트 단에서 우회해서 사용해야 한다.

그래서 package.json에서 제공받은 api의 base url을 전달해주었고, 사용하는 쪽에서는 base url을 제외한 나머지 엔드포인트를 입력해주었다.

```json
// package.json
{
	...
	'proxy': BASE_URL
}
```

http-proxy-middleware 라이브러리를 사용하는 방식도 있었지만 우회하려는 url이 하나이고, proxy 세팅하는 코드까지 짜는 것은 현재 프로젝트에서 우선 순위가 아닌 것 같아 package.json에서 프록시를 추가하는 방식으로만 진행했습니다.

debouncing

검색 자동 완성 기능은 사용자가 입력한 검색어에 따라 관련된 검색어를 보여준다.

<img width="1177" alt="1" src="https://user-images.githubusercontent.com/49917043/236109839-8fe7909b-e1c8-4c0e-abd1-f9fa2c8b7e71.png">


우측의 console log를 보면 사용자가 한 자씩 입력할 때 모든 변화에 대해서 api 요청을 하게 되면 불완전한 단어(ex. 갑상ㅅ)에서도 불필요한 요청을 하게 되고, 이는 서버의 부하로 이어질 수 있다. 그래서 함수의 요청 빈도를 조절해줄 필요가 있었습니다.

함수 요청 빈도를 조절하는 방법에는 크게 Debouncing과 Throttling이 있지만 키보드 입력에 있어서 일정 시간 마다 함수를 호출하는 Throttling 방법보다, 일정 시간 추가적으로 입력이 없을 경우 함수를 호출하는 Debouncing 방법이 더 나을 것 같다고 판단하여 이를 적용하기로 했습니다.

```jsx
// useDebounce.ts
import { useEffect, useState } from 'react';

function useInputDebounce(value: string, delay?: number) {
  const [debouncedValue, setDebouncedValue] = useState<string>(value);

  useEffect(() => {
		// timer 선언
		// delay 값 만큼 입력이 없을 경우 값을 수정
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

    return () => {
			// timer 초기화
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

// SearchInput.tsx
...
const [userInput, setUserInput] = useState<string>('')
const debouncedValue = useDebounce(userInput, 300);

useEffect(() => {
  if (debouncedValue) dispatch(fetchAutoCompleteWordList(debouncedValue));
}, [debouncedValue]);
...
```

![May-04-2023 12-59-17](https://user-images.githubusercontent.com/49917043/236109907-44d82eaa-9a9c-42bc-8711-0af3277913a9.gif)


debounce 되는지 확실하게 테스트 하기 위해 delay 값을 1초로 늘려서 설정하고 테스트 한 결과,

기존 ‘갑상선암’을 검색하기 위해 12번의 호출을 해야했지만 debounce 적용 이후 1회로 줄일 수 있었습니다.

(이는 delay 값에 따라 상이할 수 있습니다.)

api 캐싱 기능

같은 검색어에 대해서 계속해서 반복적으로 요청을 보내지 않고, 검색어에 대한 검색결과를 캐시에 저장함으로서 이전에 검색 이력이 있는 검색어는 api 요청 대신 캐시에서 꺼내어 동일한 결과를 사용하게끔하여 불필요한 api 요청을 줄일 수 있습니다.

동작 과정으로만 보았을 때,

```jsx
1. 검색 결과를 객체를 저장하는 빈 배열을 만든다.
2. 검색어 자동완성 api 호출이 성공하면 해당 검색어, 검색결과, api 요청 시간을 가지고 있는 데이터를 배열에 담는다.
3. 이후 검색어 api 호출이 있을 경우,
	 검색 결과 배열에서 해당 검색어가 있는지 체크하고,
	 - 검색어가 없을 경우 요청시간 기준에 따라 만료되었다면, 2번 단계처럼 새로 요청을 보내고 결과를 저장한다.
   - 검색어가 있을 경우 저장되어 있는 값을 사용한다.
```

위 같은 동작을 수행하게끔 구현하려고 했다.
