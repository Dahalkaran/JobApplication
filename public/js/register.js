document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    try {
      // Send data to the backend
      const response = await axios.post('/auth/register', {
        name,
        email,
        password,
      });
  
      // Show success message or redirect
      if (response.data.message==='User registered successfully') {
        alert('Registration successful! Redirecting to login...');
        window.location.href = '/login.html';
      } else {
        alert( 'Something went wrong!');
      }
    } catch (err) {
      console.error(err);
      alert(err.response.data.message || 'An error occurred during registration.');
    }
  });
  