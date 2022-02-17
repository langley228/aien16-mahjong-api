# aien16-mahjong-api

# mysql setting
```
./config/mahjong-reps-config
``` 

# Create table
```
./mysqlScript/create_table_tile.sql
```

# Insert data
```
./mysqlScript/insert_tile_data.sql
```

# app run
```
npm install
npm satart
```


# API
## 1. Get all titles

Get Request URL
```
http://localhost:3001/api/tiles?num=1&size=50
```

Responses Example
```
{
  "search": {},
  "pageList": {
    "num": 1,
    "size": 50,
    "total": 1
  },
  "result": {
    "total": 42,
    "datas": [
      {
        "id": 1,
        "name": "一筒",
        "rank": 1, //1~9 筒子
        "isDragon": false,
        "isWind": false,
        "isHonor": false,
        "isDot": true,
        "isCharacter": false,
        "isFlower": false,
        "count": 4
      },
      {
        "id": 10,
        "name": "一條",
        "rank": 1, //10-18 條子
        "isDragon": false,
        "isWind": false,
        "isHonor": false,
        "isDot": false,
        "isCharacter": false,
        "isFlower": false,
        "count": 4
      },
      {
        "id": 19,
        "name": "一萬",
        "rank": 1, //19-27 萬子
        "isDragon": false,
        "isWind": false,
        "isHonor": false,
        "isDot": false,
        "isCharacter": true,
        "isFlower": false,
        "count": 4
      },
      {
        "id": 28,
        "name": "東", //28-34 東南西北中發白
        "rank": 0,
        "isDragon": false,
        "isWind": true,
        "isHonor": true,
        "isDot": false,
        "isCharacter": false,
        "isFlower": false,
        "count": 4
      },
      {
        "id": 35,
        "name": "春", //35-42 春夏秋冬梅蘭菊竹
        "rank": 1,
        "isDragon": false,
        "isWind": false,
        "isHonor": false,
        "isDot": false,
        "isCharacter": false,
        "isFlower": true,
        "count": 1
      }
    ]
  }
}
```

## 2. Can Win ?
Post Request URL 
```
http://localhost:3001/api/canwin
```

Request Example
```
{
  "inIds": [
    1,
    1,
    2,
    2,
    2,
    3,
    3,
    3,
    5,
    5
  ],
  "outIds": [
    10,
    10,
    10,
    11,
    11,
    11
  ],
  "lastId": 5
}
```

Responses Example
```
{
  "canWin": true
}
```