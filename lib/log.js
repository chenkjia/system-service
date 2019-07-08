const log4js = require('log4js');
log4js.configure({
  appenders: {                     // 从log4js 2.0版本以后 这里从一个array变为了json形式。
    dateFileLog: {                 // 定义存储为文件形式日志类型的名称(名称可随意起)
      type: 'dateFile',
      filename: "./log/logs/logs", // 项目根目录开始
      pattern: "_yyyy-MM-dd_error.log", // 存储的文件名称为 logs_yyyy-MM-dd_error.log(当天的日期)
      alwaysIncludePattern: true,     //文件名是否始终包含占位符
      absolute: false               //filename是否绝对路
    },
    logConLog: {                    // 定义在控制台输出的日志类型的名称
      type: 'console'
    }
  },
  categories: {                     // 这里面的配置是什么意思我也没仔细看过文档
    default: {
      appenders: ['dateFileLog'],
      level: 'ALL'
    },
    logConLog: {
      appenders: ['logConLog'],
      level: 'ALL'
    }
  }
});
const dateFileLog = log4js.getLogger('dateFileLog'); // 可以理解为实例化一个日志输出对象吧
const logConLogs = log4js.getLogger('logConLog');    // 可以理解为实例化一个日志输出对象吧
exports.logger = dateFileLog;  // 对外开发接口 在文件中输出
exports.logs = logConLogs;     // 对外开发接口 在控制台输出
exports.use = function (app) { // 对外开发接口 这里在app.js中调用, 接管express在控制台的输出
  app.use(log4js.connectLogger(logConLogs, {
    level: 'debug', // 他的等级我默认是DEBUG 
    format: ':method :url'
  }));
};