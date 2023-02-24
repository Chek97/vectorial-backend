// Imports
const { Router } = require('express');
const router = Router();
const Admin = require('../models/Admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/login', async(req, res) => {

    const { username, password } = req.body;

    try {
        //Encontrar el ususario
        const admin = await Admin.findOne({username});
        if(!admin){
            return res.status(400).json({
                ok: false,
                message: 'Usuario no encontrado'
            });
        }

        //Validar password
        const valid = bcrypt.compareSync(password, admin.password);
        if(!valid){
            return res.status(400).json({
                ok: false,
                error: "Usuario y(o) contraseña incorrecta"
            });
        }

        //Generar token
        jwt.sign({admin}, process.env.JWT_SECRET, {expiresIn: '1h'}, (error, token) => {
            return res.status(200).json({
                ok: true,
                message: 'Login exitoso',
                user: {
                    username: admin.username,
                    email: admin.email
                }, 
                token
            });
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            error,
        })
    }
});

router.post('/register', async (req, res) => {

    const { password, username } = req.body;

    try {
        //Encontrar si el usuario exisste por username
        let admin = await Admin.findOne({ username });
        if (admin) {
            return res.status(400).json({
                ok: false,
                message: 'El usuario ya existe'
            });
        }

        // Crear usuario
        admin = new Admin(req.body);
        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        admin.password = bcrypt.hashSync(password, salt);

        await admin.save();
        //generar token
        jwt.sign({admin}, process.env.JWT_SECRET, (error, token) => {
            //Enviar response
            return res.status(201).json({
                ok: true,
                user: admin, 
                token
            });
        });


    } catch (error) {
        return res.status(500).json({
            ok: false,
            error,
        })
    }

});

module.exports = router;