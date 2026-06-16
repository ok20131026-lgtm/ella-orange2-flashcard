# Ella ORANGE Vol.2 단어 암기 카드

ESL Rainbows ORANGE Vol.2 단어 암기 전용 정적 플래시카드 웹앱입니다. `quizData.json`의 `sets -> words` 안에 있는 `word`, `meaningKo`, `partOfSpeechKo`, `speakText`만 학습 화면에 사용합니다.

## 기능

- Unit-Lesson 세트 14개와 전체 196개 단어 로딩
- 1단계 외우기: 앞면 영어단어, 뒷면 한글뜻/영어단어/한글 품사
- 2단계 뜻 보고 고르기: 한글뜻을 보고 영어단어 2지선다 선택
- 3단계 알파벳 조립: 정답 단어에 포함된 알파벳만 섞어서 조립
- 다시 볼 카드 복습, setId + word 기준 저장
- Web Speech API 발음 듣기(en-US, rate 0.85)
- 다크모드, 모바일 햄버거 메뉴, 링크 복사
- Vercel 정적 배포 지원

## 개발 및 빌드

```bash
npm run build
```

빌드 결과는 `dist/`에 생성됩니다. `PUBLIC_URL` 환경변수가 있으면 빌드된 앱의 링크 복사 기본 주소로 삽입됩니다.
