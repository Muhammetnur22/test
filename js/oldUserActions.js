class UserService {
  // Cannot set like this 
  var username;
  var password;

  // Cannot set property username of #<UserService> which has only a getter
  // Cannot set property password of #<UserService> which has only a getter
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  // remove getter to set value
  get username() {
    return UserService.username
  }

  // remove getter to set value
  get password() {
    throw "You are not allowed to get password";
  }

  // statis functions cannot be used as a object function
  static authenticate_user() {
    // create new request object
    let xhr = new XMLHttpRequest();

    // pass required arguments with .open() method
    xhr.open('GET', 'https://jsonplaceholder.typicode.com/users');

    // should call send() method
    xhr.send();

    // it converts response to json format
    xhr.responseType = 'json';

    // cannot change value of 'const', this variable should be 'let';
    let result = false;

    // after request finished
    xhr.onload = () => {
      // check request is fine or not
      if (xhr.status !== '200') {
        result = xhr.response;
      } else {
        result = true;
      }
    }
    return result;
  }
};

$('#user-form').submit(async (e) => {
  // Should add this line
  e.preventDefault();
  // should add .val() to get values
  const username = $('#username');
  const password = $('#password');

  // Creates object and calls authenticate_user() method
  // should add asyncronous logic to get res first
  const res = new UserService(username, password).authenticate_user();

  // checks res status
  if (res === true) {
    document.location.href('/');
  } else {
    alert(res?.error);
  }
})