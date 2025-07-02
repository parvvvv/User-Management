const express = require('express');
const router = express.Router();
const multer = require('multer');
const {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
  bulkUpload,
  downloadTemplate,
} = require('../controllers/userController');

const upload = multer({ dest: 'uploads/' });

router.post('/', createUser);
router.get('/', getUsers);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

router.post('/bulk-upload', upload.single('file'), bulkUpload);
router.get('/download-template', downloadTemplate);

module.exports = router;
