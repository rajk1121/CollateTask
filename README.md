The server is hosted at https://collate-task.herokuapp.com/

### Frontend
1. `/login`
2. `/signup`


### API's present

1. /api/v1/signup               -> POST
2. /api/v1/login                -> POST
3. /api/v1/createTask           -> POST
4. /api/v1/updateTask?id=       -> PATCH
5. /api/v1/getAllTasks          -> GET
6. /api/v1/deleteTask?id=       -> DELETE
7. /api/v1/logout               -> POST

### PARAMETERS TO BE PASSED

`/api/v1/signup`

In body - > name, email, password

`/api/v1/login `

In body - > email, password

`/api/v1/createTask`

In body - > name, description, deadline, status

`Important` status should only have either one of these['Not Started', 'Ongoing', 'Completed'] values.

`/api/v1/updateTask?id=`


In query - > id of the task to be updated
In body - > fields that need to be updated

`/api/v1/getAllTasks`

It gets all the task for that user

`/api/v1/deleteTask?id=`


In query - > id of the task to be deleted

`/api/v1/logout`

It is used for logging out
