const express = require('express');
require(`./db/mongoose`)

const User = require('./models/user')
const Task = require('./models/task')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express();
const port = process.env.PORT || 3000

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, ()=>{
    console.log(`Server is up on port ${port}`);
});

// const main = async() =>{
//     const user = await User.findById('614031d8476a79b656f5dde6');
//     await user.populate('tasks')
//     console.log(user.tasks)
// }

// main()
