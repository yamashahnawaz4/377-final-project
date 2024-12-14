document.addEventListener('DOMContentLoaded', async () => {
  const readingList = document.getElementById('reading-list');

  try {
    // Fetch reading list from the server
    const response = await fetch('/reading-list');
    const data = await response.json();

    if (data.length === 0) {
      readingList.innerHTML = '<p>Your reading list is empty!</p>';
      return;
    }

    data.forEach((book) => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <h3>${book.title}</h3>
        <p>Author: ${book.author}</p>
        <button class="remove-button" data-id="${book.id}">Remove</button>
      `;
      readingList.appendChild(listItem);
    });

    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-button').forEach((button) => {
      button.addEventListener('click', async () => {
        const bookId = button.getAttribute('data-id');
        await fetch(`/reading-list/${bookId}`, { method: 'DELETE' });
        button.parentElement.remove();
      });
    });
  } catch (error) {
    console.error('Error fetching the reading list:', error);
    readingList.innerHTML = '<p>Failed to load your reading list. Please try again later.</p>';
  }
});




