const loginApi = require('express').Router();
const loginController = require('../controllers/login.controller');

// ! passportAuth middleware để config passport
const passportAuth = require('../middlewares/passport.middleware');
const passport = require('passport');

// api: login with local
loginApi.post('/', loginController.postLogin);

// api: login with gg
loginApi.get(
  '/gg',
  passport.authenticate('google', (err, result) => {
    console.log(err);
    console.log(result);
  }),
);

loginApi.get(
  '/gg/callback',
  passport.authenticate('google'),
  loginController.postLoginWithGoogle,
);

// api: authenticated with jwt
loginApi.get('/auth', passportAuth.jwtAuthentication, loginController.getAuth);

// api: refresh token
loginApi.post('/refresh_token', loginController.postRefreshToken);

// api: logout
loginApi.post('/logout', loginController.postLogout);

module.exports = loginApi;
