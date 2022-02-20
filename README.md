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

## 2. 是否胡牌
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
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    9,
    9
  ],
  "outIds": [
    10,
    10,
    10
  ],
  "lastId": 4
}
```

Responses Example
```
{
  "canWin": true
}
```


## 3. 聽牌清單
Post Request URL 
```
http://localhost:3001/api/readyhand
```

Request Example
```
{
  "inIds": [
    1,
    1,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    9,
    9
  ],
  "outIds": [
    10,
    10,
    10
  ]
}
```

Responses Example
```
[
  {
    "id": 1,
    "name": "一筒",
    "rank": 1,
    "isDragon": false,
    "isWind": false,
    "isHonor": false,
    "isDot": true,
    "isBamboo": false,
    "isCharacter": false,
    "isFlower": false,
    "count": 4
  },
  {
    "id": 2,
    "name": "二筒",
    "rank": 2,
    "isDragon": false,
    "isWind": false,
    "isHonor": false,
    "isDot": true,
    "isBamboo": false,
    "isCharacter": false,
    "isFlower": false,
    "count": 4
  },
  {
    "id": 3,
    "name": "三筒",
    "rank": 3,
    "isDragon": false,
    "isWind": false,
    "isHonor": false,
    "isDot": true,
    "isBamboo": false,
    "isCharacter": false,
    "isFlower": false,
    "count": 4
  },
  {
    "id": 4,
    "name": "四筒",
    "rank": 4,
    "isDragon": false,
    "isWind": false,
    "isHonor": false,
    "isDot": true,
    "isBamboo": false,
    "isCharacter": false,
    "isFlower": false,
    "count": 4
  },
  {
    "id": 5,
    "name": "五筒",
    "rank": 5,
    "isDragon": false,
    "isWind": false,
    "isHonor": false,
    "isDot": true,
    "isBamboo": false,
    "isCharacter": false,
    "isFlower": false,
    "count": 4
  },
  {
    "id": 6,
    "name": "六筒",
    "rank": 6,
    "isDragon": false,
    "isWind": false,
    "isHonor": false,
    "isDot": true,
    "isBamboo": false,
    "isCharacter": false,
    "isFlower": false,
    "count": 4
  },
  {
    "id": 7,
    "name": "七筒",
    "rank": 7,
    "isDragon": false,
    "isWind": false,
    "isHonor": false,
    "isDot": true,
    "isBamboo": false,
    "isCharacter": false,
    "isFlower": false,
    "count": 4
  },
  {
    "id": 8,
    "name": "八筒",
    "rank": 8,
    "isDragon": false,
    "isWind": false,
    "isHonor": false,
    "isDot": true,
    "isBamboo": false,
    "isCharacter": false,
    "isFlower": false,
    "count": 4
  },
  {
    "id": 9,
    "name": "九筒",
    "rank": 9,
    "isDragon": false,
    "isWind": false,
    "isHonor": false,
    "isDot": true,
    "isBamboo": false,
    "isCharacter": false,
    "isFlower": false,
    "count": 4
  }
]
```