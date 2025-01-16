document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    try {
      const response = await axios.post('/auth/login', { email, password });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        alert('Login successful!');
        window.location.href = '/dashboard.html';
      }
    } catch (error) {
      alert(error.response.data.error || 'Login failed');
    }
  });
  