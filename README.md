# PAUSE

## 끝없는 유튜브 알고리즘, 사용자가 원하는 만큼만 볼 수 있도록 도와주는 서비스 

## ERD
![ERD](https://imgur.com/CDAJBV9.png)

## models/index.js
```javascript
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.User = require('./user')(sequelize, Sequelize);
db.Playlist = require('./playlist')(sequelize, Sequelize);
db.Time = require('./usage')(sequelize, Sequelize);

// User:Time    1:N
db.User.hasMany(db.Time);
db.Time.belongsTo(db.User);
```

## API 명세서
|기능|URI|METHOD|요청값|Content-Type|
|:---:|:---:|:---:|:---:|:---:|
|**로그인**|`/auth/signin`|![#ffa500](https://via.placeholder.com/15/ffa500/000000?text=+) POST|Body|application/json|
|**회원가입**|`/auth/signup`|![#ffa500](https://via.placeholder.com/15/ffa500/000000?text=+) POST|Body|application/json|
|**플레이리스트조회**|`~/playlist?time=(time) & category=(category)`|![#008000](https://via.placeholder.com/15/008000/000000?text=+) GET|Query param|application/json|
|**사용시간(사용량 조회)**|`~/usage`|![#008000](https://via.placeholder.com/15/008000/000000?text=+) GET|Header|application/json|

## 기능 소개 


## package.json