document.addEventListener('DOMContentLoaded', () => {
  // Updated: Use a public backend URL
  const API_BASE_URL = 'https://vercel.com/yamashahnawaz4s-projects/377-final-project'; // <-- Replace with your backend's public URL

  // Initialize the slider for featured books
  initializeSlider();

  // Add event listener for the book search form
  const searchForm = document.getElementById('book-search-form');
  searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const query = document.getElementById('search-query').value.trim();
    if (!query) return;

    const resultsContainer = document.getElementById('book-results');
    resultsContainer.innerHTML = '<p>Loading...</p>'; // Show a loading message

    try {
      const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`);
      const data = await response.json();

      resultsContainer.innerHTML = ''; // Clear previous results

      if (data.docs && data.docs.length > 0) {
        data.docs.forEach((book) => {
          const bookElement = document.createElement('div');
          bookElement.className = 'book';
          bookElement.innerHTML = `
            <h3>${book.title}</h3>
            <p>${book.author_name ? book.author_name.join(', ') : 'Unknown Author'}</p>
            <p>First published in: ${book.first_publish_year || 'N/A'}</p>
            <button class="save-btn" data-title="${book.title}" data-author="${book.author_name ? book.author_name.join(', ') : 'Unknown'}">
              Save to Reading List
            </button>
          `;
          resultsContainer.appendChild(bookElement);
        });

        // Add event listeners to the "Save to Reading List" buttons
        document.querySelectorAll('.save-btn').forEach((button) => {
          button.addEventListener('click', async (event) => {
            const title = event.target.getAttribute('data-title');
            const author = event.target.getAttribute('data-author');

            try {
              // Updated: Use the public backend URL
              const response = await fetch(`${API_BASE_URL}/reading-list`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, author }),
              });

              if (!response.ok) {
                throw new Error('Failed to save the book.');
              }

              alert(`"${title}" by ${author} has been saved to your reading list!`);
            } catch (error) {
              console.error('Error saving book:', error);
              alert('Failed to save the book. Please try again.');
            }
          });
        });
      } else {
        resultsContainer.innerHTML = '<p>No results found.</p>';
      }
    } catch (error) {
      console.error('Error fetching book data:', error);
      resultsContainer.innerHTML = '<p>Error fetching results. Please try again later.</p>';
    }
  });
});

// Initialize the Swiper slider
async function initializeSlider() {
  const response = await fetch('https://openlibrary.org/subjects/fiction.json');
  const data = await response.json();

  const swiperWrapper = document.querySelector('.swiper-wrapper');
  if (!swiperWrapper) return;

  data.works.slice(0, 5).forEach(book => {
    const slide = document.createElement('div');
    slide.className = 'swiper-slide';
    slide.innerHTML = `
      <img src="https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg" alt="${book.title}">
      <h3>${book.title}</h3>
      <p>by ${book.authors?.[0]?.name || 'Unknown'}</p>
    `;
    swiperWrapper.appendChild(slide);
  });

  new Swiper('.swiper-container', {
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    loop: true,
    autoplay: { delay: 5000 },
  });
}










  
  
  