# culture-gallery

### 배포

임시 배포 : https://culture-gallery.firebaseapp.com/
> * 전체적인 디자인이 개편되었고 거의 대부분의 기능이 모두 구현되었습니다. (4/12)
> * 현재 모바일 최적화 작업중에 있습니다 (4/15)

### 스택
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white"> <img src="https://img.shields.io/badge/Redux-764ABC?style=for-the-badge&logo=Redux&logoColor=white"> <img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"> <img src="https://img.shields.io/badge/firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=white"> <img src="https://img.shields.io/badge/styled components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white">
 <img src="https://img.shields.io/badge/framer-0055FF?style=for-the-badge&logo=framer&logoColor=white">
<hr>

### 앱소개

* 보았던 영화, tv 프로그램, 책 등 문화 생활을 기록 해보세요!
* 기록한 것들을 마치 갤러리처럼 시각적으로 즐길 수 있습니다! 
* 나의 취향을 기록하고 다른 사람의 취향도 구경 해보세요!
* 기록은 데이터베이스 연동을 위해 회원가입이 필수적이지만, 다른 사람들의 기록을 구경하는건 로그인 없이도 가능합니다!

<img width="900" alt="image" src="https://user-images.githubusercontent.com/115640584/231358692-537df0b9-5a18-4a9f-bdda-1abdb60659bc.png">
<br>
<img width="900" alt="image" src="https://user-images.githubusercontent.com/115640584/231301578-91ba943e-5717-48dd-b33c-50bb12ad123e.png">
<hr>


### 상세 소개

* firebase 호스팅과 데이터베이스를 연동해 운영 되고 있습니다.
> 아래와 같이 데이터를 저장하고 있습니다. db에 데이터 상호작용을 최소화하기 위해 데이터 저장 방식과 관리에 대한 고민을 했고 더 효율적인 방법은 없을지 모색 중입니다.
> <img width="1084" alt="image" src="https://user-images.githubusercontent.com/115640584/231302624-d7a6c148-b32d-4515-9828-3750c69de429.png">
> 


### 추가/수정 예정
* 등록했던 컨텐츠 삭제
* 다른 사용자 컬렉션 탐색 (4/12 완료)
* 라이트, 다크모드 등 사용자 커스텀 옵션
* 한 줄 코멘트 활용

### 이슈

* 현재 책 표지의 경우 API에서 제공 받는 이미지의 품질이 좋지 못한 이유로 해상도가 깨져보이는 이슈가 있습니다.
> 또한 이미지 크기 자체가 작기때문에 메인 화면에서 영화, TV 프로그램의 포스터보다 작게 보여집니다.
> <img width="1087" alt="image" src="https://user-images.githubusercontent.com/115640584/231302178-c102e3a8-3123-4e69-9386-22fc5689bcb5.png">

### 초기 디자인

![image](https://user-images.githubusercontent.com/115640584/231991247-00a43e4d-3b54-42be-891c-5a4dce4b1e9c.png)

![image](https://user-images.githubusercontent.com/115640584/231991338-b2f644d8-e479-427e-8246-58fed9dc6e70.png)
