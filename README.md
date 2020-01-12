第一步 安装依赖
```
yarn
```
第二步：先安装docker
第三步：用docker跑一个mongodb
新建一个文件docker-compose.yml
```
version: '3.1'
services:
  mongo:
    image: mongo
    restart: always
    ports:
      - 27017:27017
    environment:
      MONGO_INITDB_ROOT_USERNAME: xxxxxxxx
      MONGO_INITDB_ROOT_PASSWORD: xxxxxxxx

  mongo-express:
    image: mongo-express
    restart: always
    ports:
      - 8081:8081
    environment:
      ME_CONFIG_MONGODB_ADMINUSERNAME: xxxxxxxx
      ME_CONFIG_MONGODB_ADMINPASSWORD: xxxxxxxx
```
执行命令
```
docker-compose up -d
```
第四步：连接数据库
建立lib/config.js
```
module.exports = {
  protocol: 'mongodb',
  user: 'xxxxxxxx',
  password: 'xxxxxxxx',
  target: 'localhost:27017',
  database: 'daxin'
}
```
第五步 程序跑起来
```
yarn start
```