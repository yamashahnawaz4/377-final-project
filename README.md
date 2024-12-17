# Final Project  
INST377 - Dynamic Web Applications

## Title of application
**BookExplorer**

## Description of application
<b>BookExplorer</b> is a web application built on Supabase, designed to help users effortlessly search for books and curate personalized reading lists. With an intuitive interface, it allows users to easily save and organize their future reads. Whether you're an avid reader or just starting your literary journey, BookExplorer makes tracking and managing your book collection simple and enjoyable.

## Our application supports desktop browsers!

Some of the desktop browsers that you can use to interact with our application include...
- Mozilla Firefox
- Google Chrome
- Brave

You can also interact with this application on a mobile device (IOS or Android).

## Developer Manual

Make sure the server is running on `http://localhost:5500`.

### Pages

- **Home Page**: [`http://localhost:5500/public/index.html`](http://localhost:5500/public/index.html)
- **About Page**: [`http://localhost:5500/public/about.html`](http://localhost:5500/public/about.html)
- **Reading List Page**: [`http://localhost:5500/public/reading-list.html`](http://localhost:5500/public/reading-list.html)

const developerManual = `
# Developer Manual

This document provides guidance for future developers working on **BookExplorer**. Follow these instructions to set up, maintain, and further develop the application.

---

## Installation Instructions

### Prerequisites
Ensure you have the following software installed:
- **Node.js** (v16+ recommended)
- **npm** (Node Package Manager, included with Node.js)
- **Git** (for cloning the repository)

### Steps to Install
1. Clone the repository:
   \`\`\`bash
   git clone https://github.com/yourusername/bookexplorer.git
   \`\`\`
2. Navigate to the project directory:
   \`\`\`bash
   cd bookexplorer
   \`\`\`
3. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`
4. Set up environment variables:
   - Create a \`.env\` file in the root directory.
   - Add the following variables with your Supabase credentials:
     \`\`\`
     SUPABASE_URL=your_supabase_url
     SUPABASE_ANON_KEY=your_supabase_anon_key
     \`\`\`

---

## Running the Application

### Local Development Server
1. Start the backend server:
   \`\`\`bash
   npm start
   \`\`\`
   This will start the server on \`http://localhost:3000\`.

2. Open the frontend in your browser:
   - Navigate to the \`public\` directory:
     \`\`\`
     http://localhost:5500/public/index.html
     \`\`\`

---

## Testing

### Running Tests
Currently, no automated tests are implemented for this project. Future developers should:
- Add unit tests for API endpoints using a framework like **Jest**.
- Test frontend functionality using **Cypress** or **Selenium**.

---

## API Documentation

### Base URL
\`http://localhost:3000\`

### Endpoints

#### **GET /reading-list**
Fetches all books from the reading list.
- **Response**:
  \`\`\`json
  [
    {
      "id": 1,
      "title": "Book Title",
      "author": "Author Name"
    }
  ]
  \`\`\`

#### **POST /reading-list**
Adds a new book to the reading list.
- **Request Body**:
  \`\`\`json
  {
    "title": "Book Title",
    "author": "Author Name"
  }
  \`\`\`
- **Response**:
  Status \`201\` with a success message.

---

## Known Bugs

1. **Duplicate Books**: Adding the same book multiple times results in duplicates.
2. **Slow Response**: Fetching large datasets from the Open Library API may result in delays.

---

## Roadmap for Future Development

1. **User Authentication**: Integrate user accounts using Supabase Auth.
2. **Advanced Filters**: Add search filters for genre, year, and ratings.
3. **Mobile Optimization**: Enhance the UI for better mobile responsiveness.
4. **Testing**: Implement automated tests to improve code reliability.
5. **Analytics**: Provide insights into user activity, such as most added books.

---

## Contribution Guidelines
1. Create a new branch for any feature or bug fix.
2. Submit a pull request with detailed descriptions of changes.
3. Adhere to the coding standards and best practices outlined in the project.

---

For additional questions, refer to the project documentation or reach out to the original development team.
`;

console.log(developerManual);
