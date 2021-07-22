# Poject To Learn about Reacc and TS

## Getting Started

build the containers
`docker-compose build`

run the containers in the background
`docker-compose up -d`

get a shell inside of the client conainer
`docker exec -it client sh`
from inside the client container
`npm start`

get a shell inside of the server container
`docker exec -it server sh`

from inside the server container
`npm run dev`

bringing everything down
`docker-compose down`

## Client (TS, React)

## Server (TS, Node, Express)

This is where the backend for the project lives.

The backend was bootstrapped with [express-generator-typescript](https://github.com/ljlm0402/typescript-express-starter)

## 📬 Recommended Commit Messages

| When             | Commit Message     |
| :--------------- | :----------------- |
| Add Feature      | ✨ Add Feature     |
| Fix Bug          | 🐞 Fix Bug         |
| Refactoring Code | 🛠 Refactoring Code |
| Install Package  | 📦 Install Package |
| Fix Readme       | 📚 Fix Readme      |
| Update Version   | 🌼 Update Version  |
| New Template     | 🎉 New Template    |
