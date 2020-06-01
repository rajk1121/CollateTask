let btn = document.querySelector('.btn')
if (btn) {
    btn.addEventListener('click', function (e) {
        e.preventDefault();
        let name = document.getElementById('name').value;
        let description = document.getElementById('description').value;
        let deadline = document.getElementById('deadline').value;
        let status = document.getElementById('status').value;
        let id = document.getElementById('id').value
        let obj = {
            "name": name,
            "description": description,
            "deadline": deadline,
            "status": status
        }
        axios.patch('/api/v1/updateTask?id=' + id, obj).then((data) => {
            if (data.data.status === 'Updated') {
                alert('Updated');
                location.assign('/view')
            }
        }).catch((err) => {
            alert(err)
        })
    })
}