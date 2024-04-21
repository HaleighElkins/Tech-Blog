const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const formData = {
      username: document.querySelector('#username-signup').value.trim(),
      email: document.querySelector('#email-signup').value.trim(),
      password: document.querySelector('#password-signup').value.trim()
    };
  
    if (formData.username && formData.email && formData.password) {
      if (formData.password.length < 8) {
        alert('Password must be at least 8 characters long.');
        return; // Stoping further execution
      }
  
      try {
        const response = await fetch('/api/users/', {
          method: 'POST',
          body: JSON.stringify(formData),
          headers: { 'Content-Type': 'application/json' },
        });
  
        if (response.ok) {
          document.location.replace('/dashboard');
        } else {
          throw new Error(response.statusText);
        }
      } catch (error) {
        alert(error.message);
      }
    }
  };
  
  document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
  