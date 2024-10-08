var addAdmin = document.querySelector('.add-admin');

addAdmin.addEventListener('submit', async function(e){
    e.preventDefault()
    let name = addAdmin.name.value;
    let email = addAdmin.email.value;

    try {

        let res = await fetch('/adminAuth/signup',{
            method: 'POST',
            body: JSON.stringify({name,email}),
            headers: {'Content-Type':'application/json'}
        });

        let data = await res.json()

        console.log(data);
        
    } catch (err) {
        console.error(err);
    }
});