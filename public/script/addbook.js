let addbooks = document.querySelector('.book-form');

addbooks.addEventListener('submit', async function(e) {
    e.preventDefault();
    let title = addbooks.title.value;
    let author = addbooks.author.value;
    let genre = addbooks.genre.value;
    let total_copies = addbooks.total_copies.value;
    let isbn = addbooks.isbn.value;
    let published_year = addbooks.published_year.value;
    console.log({title,author,genre,total_copies,isbn,published_year});

    try {

        let res = await fetch('/admin/add-book', {
            method: 'POST',
            body: JSON.stringify({title,author,genre,total_copies,isbn,published_year}),
            headers: {'Content-Type': 'application/json'}
        });

        let data = await res.json();
        
        console.log(data);
        
    } catch (err) {
        console.error(err);
    }
})