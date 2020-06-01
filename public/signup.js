let btn = document.querySelector('.btn');
console.log('HElo')

if (btn) {
    console.log('hello')
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;
        let name = document.getElementById('name').value;
        let obj = {
            "email": email,
            "password": password,
            "name": name,

        }
        axios.post('/api/v1/signup', obj).then((res) => {
            console.log(res)
            if (res.data.status == 'Registration Successfull') {
                alert('Registered');
                location.assign('/view');
            }
        }).catch((err) => {
            alert(err.response.data.status);
            console.log(err.response);
            location.assign('/signup');
        })

    })
}