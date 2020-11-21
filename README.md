# Pause
<img src="https://imgur.com/spjezf0.png" width="40%">

> ### 알고리즘의 늪에서 나를 구할, 영상 시청 시간 관리 앱. 
> ### 일상을 위한 멈춤, Pause.

## ERD
<img src="https://imgur.com/DZ8wNtt.png" width="80%">

## models/index.js
```javascript
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.User = require('./user')(sequelize, Sequelize);
db.Playlist = require('./playlist')(sequelize, Sequelize);
db.Usage = require('./usage')(sequelize, Sequelize);

// User:Time    1:N
db.User.hasMany(db.Usage);
db.Usage.belongsTo(db.User);
```

## API 명세서
|기능|URI|METHOD|요청값|Content-Type|
|:---:|:---:|:---:|:---:|:---:|
|**로그인**|`~/auth/signin`|![#ffa500](https://via.placeholder.com/15/ffa500/000000?text=+) POST|Body|application/json|
|**회원가입**|`~/auth/signup`|![#ffa500](https://via.placeholder.com/15/ffa500/000000?text=+) POST|Body|application/json|
|**플레이리스트추가**|`~/playlist`|![#ffa500](https://via.placeholder.com/15/ffa500/000000?text=+) POST|Body|application/json|
|**플레이리스트조회**|`~/playlist?playtime=(playtime) & category=(category)`|![#008000](https://via.placeholder.com/15/008000/000000?text=+) GET|Query param|application/json|
|**사용시간(사용량 조회)**|`~/usage`|![#008000](https://via.placeholder.com/15/008000/000000?text=+) GET|Header|application/json|

[API 명세서 바로가기][api]

## 기능 소개 
- **Signin**: 로그인 기능
- **SignUp**: 회원가입 기능으로, 서버에서 등록하는 용도로만 쓰였다.
- **Playlist**: 플레이스트를 DB에 등록하고, 조건에 맞는(시간/카테고리) 플레이리스트를 조회한다. (등록은 서버 전용)
- **Usage**: 회원이 설정한 시간/시청한 시간을 1주 단위로 한 눈에 확인할 수 있으며, 주 평균 시청 시간과 총 절제한 시간을 확인할 수 있다.

## 업무 분담
- **석영현** : Playlist, Usage
- **신연상** : Signin & Signup, Usage

## package.json
```json
  "dependencies": {
    "aws-sdk": "^2.797.0",
    "cookie-parser": "~1.4.4",
    "debug": "~2.6.9",
    "express": "~4.16.1",
    "http-errors": "~1.6.3",
    "jade": "~1.11.0",
    "jsonwebtoken": "^8.5.1",
    "morgan": "~1.9.1",
    "multer": "^1.4.2",
    "multer-s3": "^2.9.0",
    "mysql2": "^2.2.5",
    "sequelize": "^6.3.5",
    "sequelize-cli": "^6.2.0"
  }
```

[api]: https://github.com/SOPT27-PAUSE/PAUSE_server/wiki