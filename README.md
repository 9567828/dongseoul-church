# Project Name
### 도담교회
교회이름 임의로 지음<br />
교회 홈페이지 + 관리자 CMS 프로젝트<br/>
권한 기반 접근 제어와 실무형 데이터 모델링에 중점을 두었습니다.<br/>
---
### test 계정
1. super 계정<br />
   id: super@testdomain.com <br/>
   pw: qwer1234@
2. admin 계정<br />
   id: admin@naver.com<br />
   pw: qwer1234@ <br/>
👉 사이트바로가기: https://dodam-church-zeta.vercel.app/auth/login

## 🧱 Tech Stack

### 🎨 Frontend
* Next.js (App Router)
* React
* TypeScript
* SCSS Modules

### 🔄 State & Data
* TanStack Query
* Zustand
* YOUTUBE API

### 🛡 Backend / BaaS
* Supabase (Auth, PostgreSQL, Storage, RLS)

## ⚙️ Delvelopemnt
npm run dev

## 🔀 Working Branch
dev

## 🚀 배포환경
vercel

# ✨ Features (v1)
### 메인페이지
* 반응형 메인페이지

### 교인목록
* CRUD (등록/수정/삭제(is_deleted 논리형 삭제))
* 이메일로 초대된 회원만 인증 가입진행
* 이메일 인증 비밀번호 재설정
* 권한기반 접근 제어 (admin/super)
* 관리자 계정의 개인프로필 페이지

### 사진목록
* CRUD (등록/수정/삭제)

### 말씀영상
* Youtube API로 영상 데이터 가져오기
* 노출여부 제어 (삭제없음)
* 마지막 동기화 시간 관리

### Common
* 전체 검색
* 게시글 검색
* 날짜 필터

# 🚧 Road Map
## v2 (Planned)
* 직분(position) / 사역(duty) 테이블 분리
* 교인 기록 카드 (등록일, 세례일, 입교일)
  * 가족 관계 관리
* 설정 페이지 추가 (직분 / 사역 / 사진 카테고리 관리)
* 메인 사이트의 사진 페이지 카테고리별 탭 추가
* 엑셀 대량 업로드
