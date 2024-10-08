var menuBtn = document.querySelector('.menu-btn');
        var list = document.querySelector('.list');
        var createAdminWrapper = document.querySelector('.create-admin-wrapper');
        var closes = document.querySelector('.close');
        var popAdmin = document.querySelector('.pop-admin');
        var bookFormWrapper = document.querySelector('.book-form-wrapper');
        var closeBookForm = document.querySelector('.close-book-form');
        var addBook = document.querySelector('.add-book');


        menuBtn.addEventListener('click', function(){
            (list.style.display === 'none') ? list.style.display = 'block' : list.style.display = 'none';
        });

        popAdmin.addEventListener('click', function(){
            createAdminWrapper.style.display = 'flex';
            list.style.display = 'none';
        });

        closes.addEventListener('click', function(){
            createAdminWrapper.style.display = 'none';
        });

        closeBookForm.addEventListener('click', function(){
            bookFormWrapper.style.display = 'none';
        });

        addBook.addEventListener('click', function(){
            bookFormWrapper.style.display = 'flex';
            list.style.display = 'none';
        })