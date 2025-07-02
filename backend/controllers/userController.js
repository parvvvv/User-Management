const User = require('../models/user');
const fs = require('fs');
const ExcelJS = require('exceljs');
const validator = require('validator');

const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;

exports.createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, pan } = req.body;

    if (!firstName || !lastName || !email || !phone || !pan) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: 'Invalid email' });
    }

    if (!/^\d{10}$/.test(phone)) {
      return res.status(400).json({ message: 'Invalid phone number' });
    }

    if (!panRegex.test(pan)) {
      return res.status(400).json({ message: 'Invalid PAN number format' });
    }

    const user = await User.create({ firstName, lastName, email, phone, pan });
    res.status(201).json({ message: 'User created', user });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

exports.updateUser = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, pan } = req.body;

    if (!firstName || !lastName || !email || !phone || !pan) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName, email, phone, pan },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User updated', user });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json({ message: 'User deleted' });
};

exports.bulkUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(req.file.path);
    const worksheet = workbook.getWorksheet(1);

    const rows = [];
    const errors = [];

    worksheet.eachRow((row, index) => {
      if (index === 1) return;

      const [firstName, lastName, email, phone, pan] = row.values.slice(1);
      const rowErrors = [];

      if (!firstName || !lastName || !email || !phone || !pan) {
        rowErrors.push('All fields required');
      }

      if (!validator.isEmail(email)) rowErrors.push('Invalid email');
      if (!/^\d{10}$/.test(phone)) rowErrors.push('Invalid phone');
      if (!panRegex.test(pan)) rowErrors.push('Invalid PAN');

      if (rowErrors.length > 0) {
        errors.push({ row: index, errors: rowErrors });
      } else {
        rows.push({ firstName, lastName, email, phone, pan });
      }
    });

    if (errors.length > 0) {
      return res.status(400).json({ message: 'Validation errors', errors });
    }

    await User.insertMany(rows);
    fs.unlinkSync(req.file.path);
    res.json({ message: 'Bulk upload successful', count: rows.length });
  } catch (err) {
    res.status(500).json({ message: 'Error processing file', error: err.message });
  }
};

exports.downloadTemplate = async (req, res) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Users');

  worksheet.addRow(['First Name', 'Last Name', 'Email', 'Phone Number', 'PAN Number']);
  worksheet.addRow(['Parv', 'Goel', 'test@test.com', '9999999999', 'ABCDE1234F']);

  res.setHeader(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  );
  res.setHeader('Content-Disposition', 'attachment; filename=sample.xlsx');

  await workbook.xlsx.write(res);
  res.end();
};
