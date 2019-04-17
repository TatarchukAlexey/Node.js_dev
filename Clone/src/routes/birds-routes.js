const express = require ('express');
const router = express.Router(); 

router.get('/',(req,res)=>{
    req.send('Home router')
})
router.get('/about',(req,res)=>{
    req.send('about birds')
})

module.exports = router;