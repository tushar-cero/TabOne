import express from 'express';
const router = express.Router();

import {register, login, logout, getMe, updateDetails, updatePassword, deleteAUser} from '../controller/usersController.js';
import {registerRules, loginRules, updateDetailsRules, updatepasswordRules} from '../middleware/validationRules.js';
import { validateResult } from '../middleware/validationResults.js';
import auth from '../middleware/auth.js';

router.post('/register', register);
router.post('/login', login);
// router.get('/logout', auth, logout);
router.get('/logout', logout);
router.get('/me', auth, getMe);
router.put('/updatedetails', auth, updateDetails);
router.put('/updatepassword', auth, updatePassword);
router.delete('/delete', auth, deleteAUser);

export default router;

// router.post('/register', registerRules, validateResult, register);
// router.post('/login', loginRules, validateResult, login);
// router.get('/logout', auth, logout);
// router.get('/me', auth, getMe);
// router.put('/updatedetails', auth, updateDetailsRules, validateResult, updateDetails);
// router.put('/updatepassword', auth, updatepasswordRules, validateResult, updatePassword);
// router.delete('/delete', auth, deleteAUser);