// Imports
const { Router } = require('express');
const { validateJWT } = require('../middlewares/validateJWT');
const router = Router();
const User = require('../models/User');

router.get('/admin_list_active_users', validateJWT, async (req, res) => {
    try {
        const users = await User.find().populate("name", "email");

        return res.status(200).json({
            ok: true,
            users
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: error
        });
    }
});

router.post('/create', validateJWT, async (req, res) => {
    const user = new User(req.body);

    try {
        const newUser = await user.save();

        return res.json({
            ok: true,
            newUser
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: error
        });
    }

});

router.delete('/admin_delete_user/:id', validateJWT, async(req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findById(id);

        if(!user){
            return res.status(400).json({
                ok: false,
                message: 'No hay un usuario con ese id'
            });
        }

        await User.findByIdAndDelete(id);

        return res.status(200).json({
            ok: true,
            message: "El usuario fue eliminado"
        });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: error
        });
    }
});

module.exports = router;