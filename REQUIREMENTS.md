### 기능 요구사항

- [x] 상품 정보를 불러온다.

  - [x] 페이지에 들어가면 상품 정보를 `json server`에서 불러온다.

- [x] `Redux`를 활용한 장바구니 상태 관리

### 추가 구현 사항

- [x] 상품 정보를 불러온다.
  - [x] 서버에서 오류 시 ‘서버 오류' 화면을 보여준다.
  - [x] 서버에서 데이터를 불러오는 중 로딩 화면을 보여준다.
- [x] 장바구니 담기/빼기 기능 구현
  - [x] 장바구니 아이콘을 누르면 상품이 장바구니에 담긴다.
  - [x] 장바구니에 담긴 상품의 장바구니 아이콘을 다시 누르면 장바구니에서 제외된다.
  - [x] 장바구니에 담은 상품 목록은 Local-Storage에 저장한다.

### STEP2

- [x] 장바구니 페이지
  - [x] 전체 선택 체크박스
    - [x] '전체 선택' 체크박스를 눌렀을 때
      - [x] 장바구니에 있는 모든 상품이 선택된다.
      - [x] '전체 선택' 텍스트가 '선택 해제'로 바뀐다.
    - [x] '선택 해제' 체크박스를 눌렀을 때
      - [x] 장바구니에 있는 모든 상품 선택이 해제된다.
      - [x] '선택 해제' 텍스트가 '전체 선택'로 바뀐다.
  - [x] 상품 삭제 버튼
    - [x] 선택된 상품 개수와 함께 삭제할지 사용자에게 확인한다.
    - [x] 사용자가 삭제 확인을 했을 때 선택된 상품이 장바구니에서 제거된다.
  - [x] 배송 상품
    - [x] 배송 상품 뒤에 장바구니에 있는 상품들의 개수를 출력한다.
    - [x] 버튼을 눌렀을 때 상품 개수를 바꿀 수 있다.
      - [x] 최소 상품개수는 1개이다.
    - [x] 쓰레기통 버튼을 눌렀을 때 사용자에게 상품의 이름과 함께 삭제할지 사용자에게 확인한다.
  - [x] 결제 예상 금액
    - [x] 선택된 상품들의 총 가격을 출력한다.
    - [x] 주문하기와 선택된 상품들의 개수를 함께 출력한다.
- [x] 단위 테스트
- [x] MSW를 활용해 API Mocking

### STEP3

- [ ] 로그인 페이지

  - [ ] 로그인 버튼
    - [ ] 로그인을 할 수 있다.
      - [ ] 유저의 accessTokend을 localStorage에 저장한다.
    - [ ] 로그인 실패 시 사용자에게 메세지로 알려준다.
  - [ ] 회원 가입 버튼
    - [ ] 회원 가입 페이지로 이동한다.

- [ ] 회원 가입 페이지

  - [ ] 회원 가입 정보 입력

    - [ ] 로그인 정보 입력 화면

      - [ ] 이메일
        - [ ] 정규식 : ^0-9a-zA-Z@0-9a-zA-Z\.[a-zA-Z]
      - [ ] 비밀번호
        - [ ] 8~16자 사이에 대문자, 소문자, 숫자, 특수문자에 맞는 비밀번호를 입력한다.
      - [ ] 이전 버튼을 클릭 시 기본 정보 입력 폼을 보여준다.

    - [ ] 기본 정보 입력 화면

      - [ ] 이름
        - [ ] 1자 이상, 30자 이내의 이름을 입력한다.
      - [ ] 전화번호
        - [ ] 010을 제외한 4자리 숫자 2개를 전화번호로 입력한다.
      - [ ] 주소
        - [ ] 1자 이상 주소를 입력한다.
      - [ ] 다음 버튼을 클릭 시 로그인 정보 입력 폼을 보여준다.

    - [ ] 형식에 맞지 않을 경우 사용자에게 메세지로 알려준다.

  - [ ] 모든 입력이 완료 됐을 경우 회원가입 버튼이 활성화 된다.

- [ ] 회원 정보 수정 페이지
  - [ ] 이메일을 제외한 회원 정보를 수정할 수 있다.
  - [ ] 비밀번호를 제외한 값들은 기존의 값으로 채워져 있다.
  - [ ] 회원 탈퇴 버튼을 눌렀을 때, confirm 메세지가 뜬다
    - [ ] 확인을 누르면 유저의 정보가 삭제되고, 로그인 창으로 리다이렉트 된다.
  - [ ] 모든 입력이 완료 됐을 경우 정보 수정 버튼이 활성화 된다.