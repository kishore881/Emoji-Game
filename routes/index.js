const express = require('express');
const router = express.Router();

const gapi = require('../utils/gapi-util.js');
const dbu = require('../utils/db-utils.js');
const mdlwr = require('../utils/mdlwr.js');
var user = null;

router.get('/', mdlwr.redirectVerified, async (req,res)=>{
    /*if(user && user.exp > Math.floor(Date.now()/1000)){
        return res.redirect('/idc');
    }*/
    let tot, skp;
    tot = await dbu.getcnt();
    skp = await dbu.retrieve('none');
    res.render('login', {total:tot,none:skp});
});

router.get('/dedicate', mdlwr.redirectUnverified, (req,res)=>{
    /*if(!user)
        return res.redirect('/');
    res.render('dedicate',{userName:user.name});*/
    res.render('dedicate',{userName: req.session.userName});
});

router.get('/idc', mdlwr.redirectUnverified, async (req,res)=>{
    /*if(!user){
        return res.redirect('/');
    }*/
    let tot, skp, usp,user = req.session.userName;
    tot = await dbu.getcnt();
    skp = await dbu.retrieve('none');
    usp = await dbu.retrieve(user/*user.name*/);
    res.render('stats',{userName: user, total:tot, none:skp, user:usp});
});

router.post('/dedicate', mdlwr.redirectUnverified, async (req,res)=>{
    /*if(!user)
        return res.redirect('/');*/
    let user = req.session.userName;
    try{
        await dbu.record(req.body, user);
        res.send({success: true});
    }catch(error){
        res.send({success: false});
    }
})

router.post('/signout',mdlwr.redirectUnverified, (req,res)=>{
    let user = req.session.userName;
    /*if(user){*/
        try{
            req.session.destroy();
            res.redirect('/');
        }catch(err){
            console.log('error in signout\n\n');
            console.log(err);
            return res.send({error:'Request Failed'});
        }
        /*if(user.sub = req.body.gid)
            user = null;
        else{
            console.log('user google id not matching');
            return res.send({error:'Invalid Request'});
        }
    }
    return res.redirect('/');*/
});

router.post('/verify', mdlwr.redirectVerified, (req,res)=>{
    let id_token = req.body.id_token;
    gapi.verify(id_token).then((result)=>{
        if(result.success && result.payload.aud == process.env.CLIENT_ID){
            /*user = result.payload;*/
            req.session.userName = result.payload.name;
            req.session.eMail = result.payload.email;
            return res.redirect('/idc'); //ajax call wont allow redirect instead it gets the data returned from get('/dedicate')
        }else{
            console.log('failed authentication');
            res.send({error:`Google Authentication Failed`});
        }
    });
});

module.exports = router;