# 42-RedTetris

The objective of this project is to develop a networked multiplayer tetris game from a stack of software exclusively Full Stack Javascript

There also is a classic solo mode with a leaderboard.

Everything is in real time thanks to socket.io.

The code is entirely unit tested with jest.
<!-- 
You can try it out **[here](https://tetris-orange.herokuapp.com/#)**.
It can take some time to load the app, heroku servers must wake up. -->

## Built with

### Front-end

* React.js + Redux

### Back-end

* Node.js
* Socket.io

## Skills

* Object-oriented programming 
* Web 
* Functional programming 
* Technology integration 

## Usage
  After Cloned the repo you must install the packages with the command:
  ```
  npm i

  ```
  Then you can run the server && client with the command:
  ```
  npm run dev
  ```
  
  The server is running on port 1337.
  The client is running on port 3000. (http://localhost:3000/)

## TEST
To see the test coverage, run:
```
npm run test:coverage
```

## Project preview

### Home page
<img src="./screens/changeAvatar.png" />

### Lobby
<img src="./screens/empty_lobby.png" />
<img src="./screens/full_lobby.png" />

### game launched
<img width="1440" alt="other_player" src="https://user-images.githubusercontent.com/52707617/173421430-7132adba-055f-4c35-b97b-ed9daa88cf77.png">
<img width="1440" alt="player_admin" src="https://user-images.githubusercontent.com/52707617/173422122-a4ad44cd-cc98-4709-9efc-3382a7e70e27.png">
<img src="./screens/game_started.png" />

### chat & score infos
<img src="./screens/chat.png" />
<img src="./screens/rows.png" />

### Game Over screen
<img src="./screens/wined_game.png" />

### Winner screen
<img src="./screens/winner_view.png" />
