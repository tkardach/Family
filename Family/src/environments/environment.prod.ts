import { NgxLoggerLevel } from 'ngx-logger';
 
export const environment = {
  production: true,
  apiUrl: 'http://api.myservice.com/api/logs', // Replace with remote API
  logLevel: NgxLoggerLevel.OFF,
  serverLogLevel: NgxLoggerLevel.ERROR,
  imageAndVideoUploadURL: 'http://localhost:8080/api/media/upload',
  imageAndVideoAllowedTypes: ["image", "video"]
};