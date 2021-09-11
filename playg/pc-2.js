require('../src/db/mongoose');
const Task = require('../src/models/task');

// Task.findByIdAndDelete('613353ecc658346a846a8034').then((task)=>{
//     console.log(task);
//     return Task.countDocuments({status: false});
// }).then((res)=>{
//     console.log(res);
// }).catch((e)=>{
//     console.log(e);
// });

const delTaskAndCntRem = async (id)=>{
    const task = await Task.findByIdAndDelete(id);
    const rem = await Task.countDocuments({status: false});
    return rem;
}

delTaskAndCntRem('613228adce7b942f2b8c0d2e').then((cnt)=>{
    //console.log(cnt);
}).catch((e)=>{
    console.log(e);
});
