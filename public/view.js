let btn = document.querySelector('.btn');

let deletes = document.querySelectorAll('.delete');
let updates = document.querySelectorAll('.update')
let logout = document.querySelector('.logout')
if (btn) {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        let name = document.getElementById('name').value;
        let description = document.getElementById('description').value;
        let deadline = document.getElementById('deadline').value;
        let status = document.getElementById('status').value;

        let obj = {
            "name": name,
            "description": description,
            "deadline": deadline,
            "status": status
        }
        axios.post('/api/v1/createTask', obj).then((res) => {
            console.log(res)
            if (res.data.status == 'Created') {
                alert('Created');
                location.assign('/view');
            }
        }).catch((err) => {
            alert(err.response.data.status);
            console.log(err.response);
            location.assign('/view');
        })

    })
}
if (deletes) {

    for (let i = 0; i < deletes.length; i++) {
        // console.log(planId);
        deletes[i].addEventListener('click', e => {
            e.preventDefault();
            const Id = deletes[i].getAttribute('delete-id');
            axios.delete('/api/v1/deleteTask?id=' + Id).then((res) => {
                console.log(res)
                if (res.data.status == 'Deleted') {
                    alert('Deleted');
                    location.assign('/view');
                }
            }).catch((err) => {
                alert(err.response.data.status);
                console.log(err.response);
                location.assign('/view');
            })
        })

    }
}

if (updates) {

    for (let i = 0; i < updates.length; i++) {
        // console.log(planId);
        updates[i].addEventListener('click', e => {
            console.log('hello update')
            e.preventDefault();
            const Id = updates[i].getAttribute('update-id');
            location.assign('/update?id=' + Id)
        })

    }
}

if (logout) {
    logout.addEventListener('click', (e) => {
        e.preventDefault();
        axios.post('/api/v1/logout').then((res) => {
            if (res.data.status === 'Logout Successfull') {
                alert('Logged Out Success')
                location.assign('/login')

            }
        }).catch((err) => {
            alert(err)
            location.assign('/view');
        })
    })
}