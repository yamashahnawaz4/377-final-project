const SUPABASE_URL = 'https://iycbbgybrnnxegoirtcp.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5Y2JiZ3licm5ueGVnb2lydGNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMzNTY1NDQsImV4cCI6MjA0ODkzMjU0NH0.kJdjbG8wFyqm9tLui7c30pO672bCpAF6hOZqEb_bxks';

// Initialize the featured books slider
async function initializeSlider() {
  const response = await fetch('https://openlibrary.org/subjects/fiction.json');
  const data = await response.json();

  const swiperWrapper = document.querySelector('.swiper-wrapper');
  if (!swiperWrapper) return;

  data.works.slice(0, 5).forEach((book) => {
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

// Initialize the slider on page load
initializeSlider();

// Search form functionality
document.getElementById('book-search-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const query = document.getElementById('search-query').value;
  const resultsDiv = document.getElementById('book-results');

  // Add the loading message
// Add the loading message with a spinner
const loadingMessage = document.createElement('div');
loadingMessage.id = 'loading-message';
loadingMessage.innerHTML = `
  <div class="spinner"></div>
  <p>Loading... Please wait.</p>
`;
resultsDiv.innerHTML = '';
resultsDiv.appendChild(loadingMessage);



  try {
    // Fetch book data from Open Library API
    const response = await fetch(`https://openlibrary.org/search.json?q=${query}`);
    const data = await response.json();

    // Clear the loading message
    resultsDiv.innerHTML = '';

    // Display book results
    data.docs.slice(0, 10).forEach((book) => {
      const bookDiv = document.createElement('div');
      bookDiv.className = 'book';
      bookDiv.innerHTML = `
        <h3>${book.title}</h3>
        <p>Author: ${book.author_name?.[0] || 'Unknown'}</p>
        <button class="save-button" data-title="${book.title}" data-author="${book.author_name?.[0]}">Save</button>
      `;
      resultsDiv.appendChild(bookDiv);
    });


    // Add event listeners to save buttons
    document.querySelectorAll('.save-button').forEach((button) => {
      button.addEventListener('click', async () => {
        const title = button.getAttribute('data-title');
        const author = button.getAttribute('data-author');

        try {
          const response = await fetch(`${SUPABASE_URL}/rest/v1/reading_list`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              apikey: SUPABASE_ANON_KEY,
              Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
            },
            body: JSON.stringify({ title, author }),
          });

          if (response.ok) {
            alert(`${title} by ${author} added to your reading list!`);
          } else {
            const errorData = await response.json();
            alert(`Error: ${errorData.message}`);
          }
        } catch (error) {
          console.error('Error saving the book:', error);
          alert('Failed to save the book. Please try again.');
        }
      });
    });
  } catch (error) {
    console.error('Error fetching book data:', error);
    resultsDiv.innerHTML = '<p>An error occurred while fetching the data. Please try again later.</p>';
  }
});


// Ensure fade-in animation is applied on page load
window.addEventListener('load', () => {
  document.body.classList.add('fade-in'); // Trigger fade-in on load
});

// Add event listeners for navigation links
document.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', (e) => {
    const targetUrl = e.target.href;

    // Check if the target URL is different from the current page
    if (targetUrl && targetUrl !== window.location.href) {
      e.preventDefault();

      // Apply fade-out animation before navigating
      document.body.classList.add('fade-out');

      setTimeout(() => {
        window.location.href = targetUrl; // Navigate after animation
      }, 1000); // Match duration of fade-out animation
    }
  });
});


window.onload = () => {
  document.body.classList.add('fade-in'); // Apply fade-in animation on load
};








  
  
  









  
  
  











  
  
  