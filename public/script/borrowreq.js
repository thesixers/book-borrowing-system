var menuBtn = document.querySelector('.menu-btn');
        var list = document.querySelector('.list');
        var createAdminWrapper = document.querySelector('.create-admin-wrapper');
        var closes = document.querySelector('.close');
        var popAdmin = document.querySelector('.pop-admin');
        var bookFormWrapper = document.querySelector('.book-form-wrapper');
        var closeBookForm = document.querySelector('.close-book-form');
        var addBook = document.querySelector('.add-book');
        var userDetailsWrapper = document.querySelector('.user-details-wrapper');
        var closeUser = document.querySelector('.closeuser'); 
        var detailBtn = document.querySelector('.detail-btn');
        // borrow request 
        var filterAll = document.querySelector('.filter-all');
        var filter = document.querySelector('.f');
        var reasonWrapper = document.querySelector('.reason-wrapper');
        var closeReason = document.querySelector('.close-reason');
        var message = document.querySelector('.messsage-box-wrapper');
        var closeMessage = document.querySelector('.close-message');

        closeMessage.addEventListener('click', function(){
            message.style.display = 'none'
        })

        function closepopReason(action){
            action === 'pop' ? reasonWrapper.style.display = 'flex' : reasonWrapper.style.display = 'none';
        }


        filter.addEventListener('click', function(){
            filterAll.style.display = filterAll.style.display === 'none' ?  'block' : 'none'
        });


        closeUser.addEventListener('click', function(){
            userDetailsWrapper.style.display = 'none';
        });

        function displayUser(){
            userDetailsWrapper.style.display = 'flex';
        }

        menuBtn.addEventListener('click', function(){
            if(list.style.display === 'none'){
                list.style.display = 'block';
                document.querySelector('.filter').style.zIndex = '-1';
            }else{
                list.style.display = 'none';
                document.querySelector('.filter').style.zIndex = '1';
            }
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
        });


        