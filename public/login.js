let btn = document.querySelector('.btn');
console.log('HElo')

if (btn) {
    console.log('hello')
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        let email = document.getElementById('email').value;
        let password = document.getElementById('password').value;
        let obj = {
            "email": email,
            "password": password,

        }
        axios.post('/api/v1/login', obj).then((res) => {
            console.log(res)
            if (res.data.status == 'Logged In') {
                alert('Logged In');
                location.assign('/view');
            } else {
                alert(res.data)
                location.assign('/login')
            }
        }).catch((err) => {
            alert(err.response.data.status);
            console.log("Invalid email or password");
            location.assign('/login');
        })

    })
}