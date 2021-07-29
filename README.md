# Poject To Learn about Reacc and TS

## Getting Started

`docker-compose up --build`

### Dev tips

After the containers are running, use the [remote-containers](https://code.visualstudio.com/docs/remote/containers) extension to [Attach to a running container](https://code.visualstudio.com/docs/remote/attach-container) inside of VSCode to develop from the container.

This workflow means that you will never need to install a specific node version or dependency on your dev machine, you can keep the dev environment _exactly_ the same as production.

## Client (TS, React)

The client was bootstrapped with create-react app using the --typescript flag. 

## Server (TS, Node, Express)

This is where the backend for the project lives.
The backend was bootstrapped with [express-generator-typescript](https://github.com/ljlm0402/typescript-express-starter)

## Database

The database is just a postgres database that is pulled down from docker, any other DB could be used.
To get rid of all the data in the DB currently, just remove the container `docker container rm jiraDB`

## 📬 Recommended Commit Messages

| When             | Commit Message     |
| :--------------- | :----------------- |
| Add Feature      | ✨ Add Feature     |
| Fix Bug          | 🐞 Fix Bug         |
| Refactoring Code | 🛠 Refactoring Code |
| Install Package  | 📦 Install Package |
| Docker Changes   | 🐳 Docker change   |
| Fix Readme       | 📚 Fix Readme      |
| Update Version   | 🌼 Update Version  |
| New Template     | 🎉 New Template    |
