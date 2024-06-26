const editPost = async (event) => {
    event.preventDefault();
  
    const id = document.querySelector('#edit-form').getAttribute('data-id');
    const title = document.querySelector('#blog-title').value.trim();
    const description = document.querySelector('#blog-desc').value.trim();
    const content = document.querySelector('#blog-content').value.trim();
  
    if (id && title && description && content) {
      try {
        const response = await fetch(`/api/blogs/${id}`, {
          method: 'PUT',
          body: JSON.stringify({ title, description, content }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          document.location.replace('/dashboard');
        } else {
          throw new Error('Failed to edit blog');
        }
      } catch (error) {
        alert(error.message);
      }
    }
  };
  
  document.querySelector('#edit-form').addEventListener('submit', editPost);
  