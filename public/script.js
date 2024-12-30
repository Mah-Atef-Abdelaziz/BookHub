document.addEventListener('DOMContentLoaded', async () => {
    const bookList = document.getElementById('book-list');
    const authorList = document.getElementById('author-list');

    try {
        // Fetch books data
        const booksResponse = await fetch('/books');
        const books = await booksResponse.json();
        books.forEach(book => {
            const li = document.createElement('li');
            li.textContent = book.title;
            bookList.appendChild(li);
        });

        // Fetch authors data
        const authorsResponse = await fetch('/authors');
        const authors = await authorsResponse.json();
        authors.forEach(author => {
            const li = document.createElement('li');
            li.textContent = author.name;
            authorList.appendChild(li);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});
