# Gemini AI Chat Application 🚀

이 프로젝트는 React와 Vite 환경을 기반으로 구글의 최신 **Gemini 2.5 Flash** 모델을 연동하여 만든 다이내믹한 챗봇 애플리케이션입니다.

## 📁 핵심 구조 및 파일 설명

- **`src/App.jsx`**: 앱의 두뇌이자 뼈대입니다.
  - 사용자의 입력(State)과 대화 내역을 관리합니다.
  - `@google/generative-ai` SDK를 사용하여 구글 서버와 통신하고 답변을 받아오는 핵심 로직이 들어있습니다.
- **`src/App.css` & `src/index.css`**: 앱의 디자인(옷)입니다.
  - 다크 테마, 글래스모피즘(투명한 유리 효과), 그라데이션 색상 및 부드러운 타이핑 애니메이션 효과를 담당합니다.
- **`package.json`**: 프로젝트의 설계도입니다.
  - React, Vite, Gemini SDK 등 앱 실행에 필요한 부품(라이브러리) 목록이 적혀있습니다.

## 🛠️ 실행 방법 (다른 노트북에서 세팅할 때)

1. **저장소 다운로드 (Clone):**
   ```bash
   git clone https://github.com/boom140-oss/practise-anti-ai.git
   cd practise-anti-ai
   ```

2. **의존성 설치:**
   ```bash
   npm install
   ```

3. **환경 변수 세팅 (가장 중요 ⭐️):**
   - 보안을 위해 GitHub에 올라가지 않은 `.env.local` 파일을 프로젝트 최상단 폴더에 직접 만듭니다.
   - 아래와 같이 자신의 API 키를 따옴표나 띄어쓰기 없이 붙여넣습니다.
   ```env
   VITE_GEMINI_API_KEY=AIzaSy...여기에...키입력
   ```

4. **로컬 서버 실행:**
   ```bash
   npm run dev
   ```
   - 브라우저에서 `http://localhost:5173` 에 접속하여 사용합니다.

## 💡 개발 중 트러블슈팅 기록

**Q. API 연동 시 `[429 Too Many Requests] limit: 0` 에러가 발생한 이유?**
- **원인:** 무료 API 키(Free Tier)를 사용 중이었으며, 구글의 정책상 무거운 `gemini-2.5-pro` 모델은 결제 정보가 없는 무료 계정에서 할당량(Quota)이 0으로 제한되어 있어 접근이 거부되었습니다.
- **해결 방안:** 코드를 수정하여 무료 API 키에서도 완벽하게 동작하며 속도도 훨씬 빠른 **`gemini-2.5-flash`** 모델로 변경하여 성공적으로 통신을 완료했습니다!
