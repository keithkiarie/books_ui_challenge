async function fetchBooks() {
  const response = await fetch("http://localhost:4000/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
          query Books {
            books {
              author
              coverPhotoURL
              readingLevel
              title
            }
          }`,
    }),
  });

  if (response.ok) {
    const { data } = await response.json();
    return data.books;
  } else {
    throw new Error("Failed to fetch books");
  }
}

module.exports = fetchBooks;
