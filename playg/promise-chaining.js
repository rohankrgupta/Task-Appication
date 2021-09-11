require('../src/db/mongoose');
const User = require('../src/models/user');
//61322fc19f48426b8d148fa1
// User.findByIdAndUpdate('61323edb83c4d9a3de7882c5', {age: 21}).then((user)=>{
//     console.log(user);
//     return User.countDocuments({age: 21});
// }).then((res)=>{
//     console.log(res);
// }).catch((e)=>{
//     console.log(e);
// })

const updateAgeAndCnt = async(id, age)=>{
    const user = await User.findByIdAndUpdate(id, {age});
    const cnt = await User.countDocuments({age});
    return cnt;
}

updateAgeAndCnt('61322fc19f48426b8d148fa1', 22).then((cnt)=>{
    console.log(cnt);
}).catch((e)=>{
    console.log(e);
});
