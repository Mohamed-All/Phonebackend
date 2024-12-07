const express = require('express')
const router = express.Router();
const Iphone = require('../models/Iphone-model');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;




cloudinary.config({
    cloud_name: 'duwd46afm',
    api_key: '716694817629873',
    api_secret: '9T7JwOP5Ujy6XpIRhunhNWsoFas'
});


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {

        allowedFormats: ['jpg', 'png', 'jpeg'],
    },
});
const upload = multer({ storage: storage });


// add iphone
router.post('/add', upload.array('img', 10), async (req, res) => {
  try {
      // إذا كانت الملفات فارغة أو غير موجودة
      if (!req.files || req.files.length === 0) {
          return res.status(400).json({ message: 'No files were uploaded.' });
      }

      const newIphone = new Iphone({
          ...req.body,
          img: req.files.map(file => file.path) // مسارات الصور المرفقة
      });

      await newIphone.save();
      res.status(201).json({ message: 'Iphone added successfully', iphone: newIphone });
  } catch (error) {
      console.error('Error adding Iphone:', error);
      res.status(500).json({ message: 'Error adding Iphone', error });
  }
});


 
// get all iphones
router.get('/all', async (req, res) => {
    try {
      const iphones = await Iphone.find();
      res.status(200).json(iphones);
    } catch (error) {
      console.error('Error fetching iPhones:', error); 
      res.status(500).json({ message: 'Error fetching iPhones.', error: error.message });
    }
  });
  
  // get by id 
  router.get('/:id', async (req, res) => {
    const { id } = req.params; 
    try {
      const iphone = await Iphone.findById(id); 
      if (!iphone) {
        return res.status(404).json({ message: 'iPhone not found' }); 
      }
      res.status(200).json(iphone); 
    } catch (error) {
      console.error('Error fetching iPhone by ID:', error);
      res.status(500).json({ message: 'Error fetching iPhone.', error: error.message });
    }
  });
  

// update iphone by id 
router.put('/:id', async (req, res) => {
    try {
      if (!req.body.name || !req.body.brand || !req.body.price) {
        return res.status(400).json({ message: 'Please provide all required fields.' });
      }
  
      const updatedData = {
        name: req.body.name,
        brand: req.body.brand,
        model: req.body.model,
        storage: req.body.storage,
        price: req.body.price,
        location: req.body.location,
        description: req.body.description,
      };
  
      const updatedIphone = await Iphone.findByIdAndUpdate(req.params.id, updatedData, { new: true });
  
      if (!updatedIphone) {
        return res.status(404).json({ message: 'iPhone not found.' });
      }
  
      res.status(200).json({ message: 'iPhone updated successfully!', data: updatedIphone });
    } catch (error) {
      res.status(500).json({ message: 'Error updating iPhone.', error });
    }
  });
  
  // delete by ID

  router.delete('/delete/:id', async (req, res) => {
    try {
      const deletedIphone = await Iphone.findByIdAndDelete(req.params.id);
      if (!deletedIphone) {
        return res.status(404).json({ message: 'iPhone not found.' });
      }
      res.status(200).json({ message: 'iPhone deleted successfully!' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting iPhone.', error });
    }
  });



module.exports = router ;