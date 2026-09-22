document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('loginForm');
  var usernameInput = document.getElementById('username');
  var passwordInput = document.getElementById('password');
  var usernameError = document.getElementById('usernameError');
  var passwordError = document.getElementById('passwordError');
  var formMessage = document.getElementById('formMessage');
  var loginBtn = document.getElementById('loginBtn');
  var loginBtnText = document.getElementById('loginBtnText');
  var clearBtn = document.getElementById('clearBtn');
  var togglePassword = document.getElementById('togglePassword');

  togglePassword.addEventListener('click', function () {
    var isPassword = passwordInput.type === 'password';
    passwordInput.type = isPassword ? 'text' : 'password';
    togglePassword.textContent = isPassword ? 'Hide' : 'Show';
  });

  clearBtn.addEventListener('click', function () {
    form.reset();
    usernameError.textContent = '';
    passwordError.textContent = '';
    formMessage.textContent = '';
    formMessage.className = 'form-message';
    usernameInput.focus();
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    usernameError.textContent = '';
    passwordError.textContent = '';
    formMessage.textContent = '';
    formMessage.className = 'form-message';

    var username = usernameInput.value.trim();
    var password = passwordInput.value.trim();
    var hasError = false;

    if (username === '') {
      usernameError.textContent = 'Please enter your username or email.';
      hasError = true;
    }
    if (password === '') {
      passwordError.textContent = 'Please enter your password.';
      hasError = true;
    }
    if (hasError) {
      return;
    }

    setLoading(true);

    fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username, password: password })
    })
      .then(function (response) { return response.json(); })
      .then(function (data) {
        setLoading(false);
        showMessage(data.message, data.success ? 'success' : 'error');
      })
      .catch(function () {
        setLoading(false);
        showMessage('Unable to reach the server. Please try again.', 'error');
      });
  });

  function showMessage(text, type) {
    formMessage.textContent = (type === 'success' ? '\u2713 ' : '\u26A0 ') + text;
    formMessage.className = 'form-message ' + type;
  }

  function setLoading(isLoading) {
    loginBtn.disabled = isLoading;
    loginBtnText.textContent = isLoading ? 'Logging in...' : 'LOGIN';
  }
});
