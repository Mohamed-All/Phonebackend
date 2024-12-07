const express = require('express')
const router = express.Router();
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { android } = require('../models/Android-model');

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

// add android
router.post('/add', upload.array('img', 10), async (req, res) => {
    try {
        // إذا كانت الملفات فارغة أو غير موجودة
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'No files were uploaded.' });
        }
  
        const newAndroid = new android({
            ...req.body,
            img: req.files.map(file => file.path) // مسارات الصور المرفقة
        });
  
        await newAndroid.save();
        res.status(201).json({ message: 'android added successfully', android: newAndroid });
    } catch (error) {
        console.error('Error adding Iphone:', error);
        res.status(500).json({ message: 'Error adding Iphone', error });
    }
  });
 
// get all android
router.get('/all',async (req,res)=>{
    try {
        const AD = await android.find()
        res.status(200).json(AD)
    } catch (error) {
        res.status(500).json({ message: 'Error adding Android', error });
    }
})
// get android by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const androidd = await android.findById(id);
        if (!androidd) {
            return res.status(404).json({ message: 'Android not found' });
        }
        res.status(200).json(androidd);
    } catch (error) {
        console.error('Error fetching Android by ID:', error);
        res.status(500).json({ message: 'Error fetching Android', error });
    }
});
  
// Delete Android by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedAndroid = await android.findByIdAndDelete(req.params.id);

        if (!deletedAndroid) {
            return res.status(404).json({ message: 'Android not found.' });
        }

        res.status(200).json({ message: 'Android deleted successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting Android', error });
    }
});

// update by id 
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
  
      const updatedAndroid = await android.findByIdAndUpdate(req.params.id, updatedData, { new: true });
  
      if (!updatedAndroid) {
        return res.status(404).json({ message: 'android not found.' });
      }
  
      res.status(200).json({ message: 'android updated successfully!', data: updatedAndroid });
    } catch (error) {
      res.status(500).json({ message: 'Error updating android.', error });
    }
  });



module.exports = router ;