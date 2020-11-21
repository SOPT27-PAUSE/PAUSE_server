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