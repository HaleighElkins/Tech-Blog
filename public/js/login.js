const loginFormHandler = async (event) => {
    event.preventDefault();
  
    const emailInput = document.querySelector('#email-login');
    const passwordInput = document.querySelector('#password-login');
  
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
  
    if (email && password) {
      try {
        const response = await fetch('/api/users/login', {
          method: 'POST',
          body: JSON.stringify({ email, password }),
          headers: {
            'Content-Type': 'application/json'
          },
        });
  
        if (response.ok) {
          document.location.replace('/dashboard');
        } else {
          const errorMessage = await response.text();
          throw new Error(errorMessage);
        }
      } catch (error) {
        alert(`An error occurred: ${error.message}`);
      }
    } else {
      alert('Please provide both email and password.');
    }
  };
  
  document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
  
