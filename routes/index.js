const express = require('express');
const router = express.Router();

const gapi = require('../utils/gapi-util.js');
const dbu = require('../utils/db-utils.js');
var user = null;
var resp = null;

router.get('/',async (req,res)=>{
    if(user && user.exp > Math.floor(Date.now()/1000)){
        return res.redirect('/idc');
    }
    let tot, skp;
    tot = await dbu.getcnt();
    skp = await dbu.retrieve('none');
    res.render('login', {total:tot,none:skp});
});

router.get('/dedicate',(req,res)=>{
    if(!user)
        return res.redirect('/');
    res.render('dedicate',{userName:user.name});
});

router.get('/idc',async (req,res)=>{
    if(!user){
        return res.redirect('/');
    }
    let tot, skp, usp;
    tot = await dbu.getcnt();
    skp = await dbu.retrieve('none');
    usp = await dbu.retrieve(user.name);
    res.render('stats',{userName: user.name, total:tot, none:skp, user:usp});
});

router.post('/dedicate',async (req,res)=>{
    if(!user)
        return res.redirect('/');
    try{
        await dbu.record(req.body, user.name);
        res.send({success: true});
    }catch(error){
        res.send({success: false});
    }
})

router.post('/signout',(req,res)=>{
    if(user){
        if(user.sub = req.body.gid)
            user = null;
        else{
            console.log('user google id not matching');
            return res.send({error:'Invalid Request'});
        }
    }
    return res.redirect('/');
});

router.post('/verify',(req,res)=>{
    let id_token = req.body.id_token;
    gapi.verify(id_token).then((result)=>{
        if(result.success && result.payload.aud == process.env.CLIENT_ID){
            user = result.payload;
            return res.redirect('/dedicate');
        }else{
            console.log('failed authentication');
            res.send({error:`Google Authentication Failed`});
        }
    });
});

module.exports = router;