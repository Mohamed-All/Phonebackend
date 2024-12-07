const express = require('express')
const router = express.Router();
const iphone = require('../models/Iphone-model')
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { android } = require('../models/Android-model');
const { accessories } = require('../models/Accessories-model');
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

// add Accessories
router.post('/add', upload.array('img', 10), async (req, res) => {
    try {
        const newAccessories = new accessories({
            ...req.body,
            img: req.files.map(file => file.path)
        });
        await newAccessories.save();
        res.status(201).json({ message: 'Accessories added successfully', accessories: newAccessories });
    } catch (error) {
        console.error('Error adding Accessories:', error);
        res.status(500).json({ message: 'Error adding Accessories', error });
    }
});

 
// get all Accessories
router.get('/all',async (req,res)=>{
    try {
        const ih = await accessories.find()
        res.status(200).json(ih)
    } catch (error) {
        res.status(500).json({ message: 'Error adding Accssories', error });
    }
})

// get accseories by ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const accessory = await accessories.findById(id);

        if (!accessory) {
            return res.status(404).json({ message: 'Accessory not found' });
        }

        res.status(200).json(accessory);
    } catch (error) {
        console.error('Error fetching accessory by ID:', error);
        res.status(500).json({ message: 'Error finding accessory', error });
    }
});





// delete acss 
router.delete('/:id', async (req, res) => {
    try {
        const deletedAccessories = await accessories.findByIdAndDelete(req.params.id);

        if (!deletedAccessories) {
            return res.status(404).json({ message: 'accessories not found.' });
        }

        res.status(200).json({ message: 'accessories deleted successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting accessories', error });
    }
});


// update accesorries by id 
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
  
      const updatedAccessories = await accessories.findByIdAndUpdate(req.params.id, updatedData, { new: true });
  
      if (!updatedAccessories) {
        return res.status(404).json({ message: 'accessories not found.' });
      }
  
      res.status(200).json({ message: 'accessories updated successfully!', data: updatedAccessories });
    } catch (error) {
      res.status(500).json({ message: 'Error updating accessories.', error });
    }
  });




module.exports = router ;