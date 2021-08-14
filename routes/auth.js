/* 
    Path: api/login
*/

const { Router, response } = require('express');
const { check } = require('express-validator');

const { crearUsuario, login, renewToken } = require('../controllers/auth');
const { validarJWT } = require('../middleware/validar-jwt');
const { validarCampos } = require('../middleware/validator');

const router = Router();

router.post('/new', [
    check('nombre', 'El nombre es obligatorio').trim().not().isEmpty(),
    check('password', 'La contraseña es obligatoria').not().isEmpty().isLength({ min: 5 }),
    check('email', 'Se necesita un email válido').isEmail().normalizeEmail(),
    validarCampos
] , crearUsuario);


router.post('/', [
    check('email', 'El nombre es obligatorio').isEmail().normalizeEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login);

router.get('/renew', validarJWT ,renewToken );

module.exports = router;
