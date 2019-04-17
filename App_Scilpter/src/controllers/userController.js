const User = require('../models/userModel')

module.exports.newUser = (req,res) => {
    const data = {
        email: req.body.email,
        password: req.body.email
    }
    const newUser = new User (data);

    newUser.save(data, (err, doc) => {
        // console.log(req.body)
        if(err) return console.log(err);

        if (doc) res.json(201,{
         success: true,
         message: 'User created'
          });

          if (doc)res.status(204).json({
         success: true,
         message: 'User not created'
          })
    });
};

module.exports.login = async (req, res) => {
    const email = req.body.email;
    try {
            const user = await User.findOne({email});

            if (!user) return res.status(400).json({
                message: 'User not found'
            });
            res.status(200).json({
                success: true,
                message: `User ${user.email} successful`,
                userId: user._id
            });
            } catch (error) {
                // console.log(error);
                res.status(500).json({
                    message: error.message
                })
            }
};

module.exports.upDatePass =(req,res)=>{
const newPassword = req.body.newPassword;
const id = req.body.id;
User.findOneAndUpdate(id, (err,doc) =>{
    if(err) res.json()
})
}
module.exports.logout = (req,res) => {
    res.json({
        message: "User successfully Logout"
    });
};



