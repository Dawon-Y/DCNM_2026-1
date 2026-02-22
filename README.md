# 다른 단어를 찾아라! 🔍

똑같은 단어들 사이에 숨어있는 딱 하나, 다른 단어를 찾는 집중력 게임입니다.  
단계가 올라갈수록 그리드가 커지고 차이가 미묘해져요.

---

## 게임 방법

1. 화면에 가득 찬 단어 카드 중 **다른 단어 하나**를 찾아 클릭합니다.
2. 단계마다 제한 시간은 **5초**입니다.
3. 정답을 맞히면 다음 단계로 진행, 틀리거나 시간이 초과되면 실패 화면으로 이동합니다.
4. 총 **5단계**를 모두 클리어하면 게임 완료!
* 현재 키워드 예시. 변경 가능

| 단계 | 그리드 | 정답 단어 |
|------|--------|-----------|
| 1단계 | 2 × 2 | DC&M |
| 2단계 | 3 × 3 | DC&M |
| 3단계 | 4 × 4 | DC&M |
| 4단계 | 5 × 5 | DC&M |
| 5단계 | 6 × 6 | DC&M |

---

## 기술 스택

- **React 18** + **TypeScript**
- **Vite**
- **Tailwind CSS**

---

## 파일 구조

```
word-game/
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json
└── src/
    ├── App.tsx                  # 페이지 상태 관리 (main | game | success | fail)
    ├── main.tsx
    ├── index.css                # Tailwind + 커스텀 애니메이션
    ├── pages/
    │   ├── MainPage.tsx         # 시작 화면
    │   ├── GamePage.tsx         # 게임 화면 (타이머 + 그리드)
    │   ├── SuccessPage.tsx      # 단계 클리어 화면
    │   └── FailPage.tsx         # 실패 화면
    ├── components/
    │   ├── WordGrid.tsx         # 단어 카드 그리드 레이아웃
    │   └── WordCard.tsx         # 개별 단어 카드
    ├── hooks/
    │   └── useTimer.ts          # 카운트다운 타이머 훅
    ├── constants/
    │   └── stages.ts            # 5단계 설정 및 타이머 상수
    ├── types/
    │   └── index.ts             # 공통 타입 정의
    └── utils/
        └── generateGrid.ts      # 그리드 셀 생성 로직
```

---

## 페이지 흐름

```
MainPage
   ↓ 게임 시작
GamePage  ──→  SuccessPage  ──→  GamePage (다음 단계)
   │                │                │
   └──→  FailPage   └──→  MainPage   └──→  MainPage (5단계 클리어)
             │
             └──→  GamePage (재도전) / MainPage
```

---

## 실행 방법

**개발 서버**
```bash
npm install
npm run dev
```

**프로덕션 빌드**
```bash
npm run build
npm run preview
```

**페이지 ui**
<img width="1710" height="848" alt="image" src="https://github.com/user-attachments/assets/ab352e1d-94f1-45eb-b40a-1efc3be14e6e" />

- 1단계 예시
<img width="1710" height="831" alt="image" src="https://github.com/user-attachments/assets/d660d5ca-ff85-4641-a875-73b07ea9b775" />

- 성공, 실패페이지
<img width="1710" height="842" alt="image" src="https://github.com/user-attachments/assets/e3a98f05-2244-423f-92b7-bd15bd250dc1" />

<img width="1708" height="852" alt="image" src="https://github.com/user-attachments/assets/fe590def-27cc-4d8c-9373-df4d4cdf3510" />

- 최종 페이지(변경 예정)
<img width="1710" height="858" alt="image" src="https://github.com/user-attachments/assets/6a5d9600-2c77-4172-90e6-e5b4dbace19b" />
<img width="1710" height="842" alt="image" src="https://github.com/user-attachments/assets/ac38be3f-e413-4a72-b289-5405fee27ead" />
