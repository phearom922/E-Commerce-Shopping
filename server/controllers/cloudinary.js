const cloudinary = require("cloudinary");

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
});

// cloudinary.config({
//   cloud_name: 'djxtkj6gb',
//   api_key: '912411544548539',
//   api_secret: 'Qt-P5hgy1SO-wN-D8Bjj5zHoU4Y', // Click 'View API Keys' above to copy your API secret
// });

exports.createImage = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.body.image, {
      public_id: Date.now(),
      resource_type: "auto",
    });
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send("Upload Error!!");
  }
};

exports.removeImage = async (req, res) => {
  try {
    let image_id = req.body.public_id;
    cloudinary.uploader.destroy(image_id, (result) => {
      res.send(result);
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Remove Error!!");
  }
};


//Profile
exports.createImageProfile = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.body.image, {
      public_id: Date.now(),
      resource_type: "auto",
    });
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send("Upload Image Profile Error!!");
  }
};

exports.removeImageProfile = async (req, res) => {
  try {
    let image_id = req.body.public_id;
    cloudinary.uploader.destroy(image_id, (result) => {
      res.send(result);
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Remove Image Profile Error!!");
  }
};