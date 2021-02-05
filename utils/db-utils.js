const dedcModel = require('../models/models.js');

async function record(formresp, username){
    return await dedcModel.findOneAndUpdate({user:username},formresp,{upsert: true})
                            .exec().then((result)=>{return result;})
                            .catch((err)=>{throw new Error('Update in DB failed.')});
}

async function retrieve(username){
    var res = {
        redheart: 0,
        orangeheart: 0,
        greenheart: 0,
        heartbroken: 0,
        blueheart: 0,
        purpleheart: 0,
        blackheart: 0,
        inrel: 0,
        fire: 0,
        ffish: 0,
        creep: 0
    };
    await dedcModel.find({$or:[
        {redheart: username},
        {orangeheart: username},
        {greenheart: username},
        {heartbroken: username},
        {blueheart: username},
        {purpleheart: username},
        {blackheart: username},
        {inrel: username},
        {fire: username},
        {ffish: username},
        {creep: username},
    ]}).exec().then((result)=>{result.forEach((rec)=>{
        if(rec.redheart==username)
            res.redheart++;
        if(rec.orangeheart==username)
            res.orangeheart++;
        if(rec.greenheart==username)
            res.greenheart++;
        if(rec.heartbroken==username)
            res.heartbroken++;
        if(rec.blueheart==username)
            res.blueheart++;
        if(rec.purpleheart==username)
            res.purpleheart++;
        if(rec.blackheart==username)
            res.blackheart++;
        if(rec.inrel==username)
            res.inrel++;
        if(rec.fire==username)
            res.fire++;
        if(rec.ffish==username)
            res.ffish++;
        if(rec.creep==username)
            res.creep++;
    })});
    return res;
}

async function getcnt(){
    return await dedcModel.countDocuments().exec();
}

module.exports={record, retrieve, getcnt};

