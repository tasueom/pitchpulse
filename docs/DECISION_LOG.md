# Decision Log

## DL-0001: Backend 초기 의존성 선택

- 왜 기록하나  
  백엔드 이니셜라이저에서 의존성을 처음 선택하는 시점이라,
  이후 “왜 이걸 썼는지” 설명이 필요할 것 같아서 기록한다.

- 선택한 것
  - Spring Web: 프론트에서 호출할 REST API가 필요함
  - Validation: 요청 검증을 컨트롤러 경계에서 처리하기 위함
  - Lombok: DTO/응답 객체 작성 부담을 줄이기 위함
  - WebFlux: 외부 축구 API 호출을 WebClient로 처리하기 위함

- 일부러 넣지 않은 것
  - JPA / DB: 아직 DB가 필요한 기능이 없음, 추후 추가 예정
  - Security: 아직 인증 기능이 없음, 추후 추가 가능
  - Cache: 외부 API 호출 문제를 아직 겪지 않음

- 현재 기준
  WebFlux는 외부 API 호출에만 사용하고,
  초기에는 block()으로 단순하게 처리한다.
