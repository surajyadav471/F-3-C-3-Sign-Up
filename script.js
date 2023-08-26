function generateToken() {
    let token = new Uint8Array(16);
    crypto.getRandomValues(token);
    return Array.from(token, decimal => decimal.toString(16).padStart(2, '0')).join('');
  }
  
  function saveUserState(state) {
    localStorage.setItem('userState', JSON.stringify(state));
  }
  
  function getUserState() {
    let state = localStorage.getItem('userState');
    return state ? JSON.parse(state) : null;
  }
  
  function requireLogin() {
    let userState = getUserState();
    if (!userState || !userState.accessToken) {
      window.location.replace('/signup.html');
    }
  }
  
  function requireLogout() {
    let userState = getUserState();
    if (userState && userState.accessToken) {
      window.location.replace('/profile.html');
    }
  }
  
  function logout() {
    localStorage.removeItem('userState');
  }
  
  function signUp() {
    event.preventDefault();
    let form = document.getElementById('signup-form');
    let name = form.name.value;
    let email = form.email.value;
    let password = form.password.value;
    
    
    if (!name || !email || !password) {
      let error = document.getElementById('signup-error');
      error.textContent = 'Please fill out all fields';
      error.style.color = 'red';
      return;
    }
    
    let accessToken = generateToken();
    let userState = { name, email, password, accessToken };
    saveUserState(userState);
    
    let success = document.getElementById('signup-success');
    success.textContent = 'Sign up successful!';
    success.style.color = 'green';
    setTimeout(() => {
      window.location.replace('/profile.html');
    }, 2000);
  }
  
  function signIn() {
    event.preventDefault();
    let form = document.getElementById('signin-form');
    let email = form.email.value;
    let password = form.password.value;
    
    if (!email || !password) {
      let error = document.getElementById('signin-error');
      error.textContent = 'Please fill out all fields';
      error.style.color = 'red';
      return;
    }
    
    let userState = getUserState();
    if (userState && userState.email === email && userState.password === password) {
      let success = document.getElementById('signin-success');
      success.textContent = 'Sign in successful!';
      success.style.color = 'green';
      setTimeout(() => {
        window.location.replace('/profile.html');
      }, 2000);
    } else {
      let error = document.getElementById('signin-error');
      error.textContent = 'Incorrect email or password';
      error.style.color = 'red';
    }
  }
  

  document.getElementById('signup-form').addEventListener('submit', signUp);
  document.getElementById('signin-form').addEventListener('submit', signIn);
  
 
  document.getElementById('logout-button').addEventListener('click', () => {
    logout();
    window.location.replace('/signup.html');
  });
  
  window.onload = function() {
        if (localStorage.getItem('access_token')) {
          window.location.replace('/profile');
        } else {
          window.location.replace('/signup');
        }
      }  
  
  function generateAccessToken() {
    let token = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 16; i++) {
      token += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return token;
  }
  
  const signUpForm = document.getElementById("signup-form");
  signUpForm.addEventListener("submit", signUpHandler);
  
  function signUpHandler(event) {
    event.preventDefault();
  
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    if (name === "" || email === "" || password === "") {
      const errorText = document.getElementById("error-text");
      errorText.innerText = "Please fill out all fields.";
      errorText.style.color = "red";
      return;
    }
  
    const accessToken = generateAccessToken();

    const user = {
      name,
      email,
      password,
      accessToken,
    };
  
    localStorage.setItem("user", JSON.stringify(user));
  
    const successText = document.getElementById("success-text");
    successText.innerText = "Sign up successful!";
    successText.style.color = "green";
    window.location.replace("/profile");
  }
  
  const logoutButton = document.getElementById("logout-button");
  logoutButton.addEventListener("click", logoutHandler);
  
  function logoutHandler() {
   
    localStorage.removeItem("user");
  
    window.location.replace("/signup");
  }
  
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  
  if (!user) {
    window.location.replace("/signup");
  } else {
    
    const nameText = document.getElementById("name-text");
    nameText.innerText = user.name;
  
    const emailText = document.getElementById("email-text");
    emailText.innerText = user.email;
  
    const passwordText = document.getElementById("password-text");
    passwordText.innerText = user.password;
  }
        
      