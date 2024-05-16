const getFormData = () => {
    const title = document.querySelector('#blog-title').value.trim();
    const description = document.querySelector('#blog-desc').value.trim();
    const content = document.querySelector('#blog-content').value.trim();
    return { title, description, content };
  };
  
  const submitFormData = async (data) => {
    const response = await fetch(`/api/blogs`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  };
  
  const handleFormSubmission = async (event) => {
    event.preventDefault();
    const formData = getFormData();
    
    if (formData.title && formData.description && formData.content) {
      const response = await submitFormData(formData);
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to create blog');
      }
    }
  };
  
  document.querySelector('.new-blog-form').addEventListener('submit', handleFormSubmission);
  