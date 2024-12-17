const SUPABASE_URL = 'https://iycbbgybrnnxegoirtcp.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml5Y2JiZ3licm5ueGVnb2lydGNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMzNTY1NDQsImV4cCI6MjA0ODkzMjU0NH0.kJdjbG8wFyqm9tLui7c30pO672bCpAF6hOZqEb_bxks';

document.addEventListener('DOMContentLoaded', async () => {
  const readingListElement = document.getElementById('reading-list');

  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/reading_list`, {
      method: 'GET',
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch the reading list.');
    }

    const books = await response.json();

    // Clear any existing content
    readingListElement.innerHTML = '';

    if (books.length === 0) {
      readingListElement.innerHTML = '<li>No books in your reading list yet!</li>';
    } else {
      // Populate the list with Remove button
      books.forEach((book) => {
        const listItem = document.createElement('li');
        listItem.className = 'listItem';
        listItem.textContent = `${book.title} by ${book.author}`;

        // Create Remove button
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'remove-button';
        removeButton.addEventListener('click', async () => {
          try {
            const response = await fetch(`${SUPABASE_URL}/rest/v1/reading_list?id=eq.${book.id}`, {
              method: 'DELETE',
              headers: {
                apikey: SUPABASE_ANON_KEY,
                Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
                'Content-Type': 'application/json',
              },
            });

            if (response.ok) {
              alert(`${book.title} by ${book.author} has been removed from your reading list.`);
              listItem.remove(); // Remove the item from the UI

              // Regenerate the chart after removing the book
              generateChart(books.filter((b) => b.id !== book.id));
            } else {
              const errorData = await response.json();
              alert(`Error: ${errorData.message}`);
            }
          } catch (error) {
            console.error('Error removing the book:', error);
            
          }
        });

        listItem.appendChild(removeButton);
        readingListElement.appendChild(listItem);
      });
    }

    // Generate Chart with Book Data
    generateChart(books);

  } catch (error) {
    console.error('Error fetching reading list:', error);
    readingListElement.innerHTML = '<li>Failed to load reading list. Please try again later.</li>';
  }
});

// FUNCTION TO GENERATE CHART
function generateChart(data) {
  const chartElement = document.getElementById('reading-list-chart');

  if (!chartElement) {
    console.error('Chart element not found.');
    return;
  }

  const ctx = chartElement.getContext('2d');
  const authors = {}; // Count books by author

  data.forEach(book => {
    const author = book.author || 'Unknown';
    authors[author] = (authors[author] || 0) + 1;
  });

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: Object.keys(authors),
      datasets: [{
        label: 'Number of Books',
        data: Object.values(authors),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      }],
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

