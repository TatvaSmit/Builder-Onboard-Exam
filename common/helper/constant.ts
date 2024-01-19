// Reference URL for email regex = https://emailregex.com/
const EMAILREGEX =
  /^(?=.{1,64}@)(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(?=.{1,255}$)((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//Reference URL https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
const PASSWORDREGX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const TOKENEXPIRETIME = "1d";
const SALT = 10;
export { EMAILREGEX, PASSWORDREGX, TOKENEXPIRETIME, SALT };
