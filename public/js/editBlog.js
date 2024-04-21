const addComment = async (event) => {
    event.preventDefault();
  
    const content = document.querySelector('#comment-content').value.trim();
  
    if (content) {
      try {
        const blog_id = event.target.getAttribute('data-id');
        const response = await fetch(`/api/comment`, {
          method: 'POST',
          body: JSON.stringify({ content, blog_id }),
          headers: { 'Content-Type': 'application/json' },
        });
  
        if (response.ok) {
          document.location.reload();
        } else {
          throw new Error(response.statusText);
        }
      } catch (error) {
        alert(error.message);
      }
    }
  };
  
  const delBlog = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      try {
        const id = event.target.getAttribute('data-id');
        const response = await fetch(`/api/blogs/${id}`, {
          method: 'DELETE',
        });
  
        if (response.ok) {
          document.location.replace('/dashboard');
        } else {
          throw new Error('Failed to delete blog');
        }
      } catch (error) {
        alert(error.message);
      }
    }
  };
  
  document.querySelector('.comment-form').addEventListener('submit', addComment);
  document.querySelector('.btn-delete').addEventListener('click', delBlog);
  