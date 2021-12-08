class UserService {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  username() {
    return UserService.username
  }

  password() {
    throw "You are not allowed to get password";
  }

  // authenticate user
  async authenticate_user() {
    try {
      const res = await fetch(`https://examples.com/api/users/authenticate?username=${this.username}&password=${this.password}`);
      if (res.status === 200) {
        return true;
      }
      return res;
    } catch (error) {
      return {
        error: 'Interval Server Error !'
      }
    }
  }
}

// Form submit event
$('#user-form').submit(async (e) => {
  e.preventDefault();
  const username = $('#username').val();
  const password = $('#password').val();

  const user = new UserService(username, password);
  const res = await user.authenticate_user();

  if (res === true) {
    document.location.href('/');
  } else {
    alert(res.error);
  }
})