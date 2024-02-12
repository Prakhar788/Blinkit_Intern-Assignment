// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const multer=require('multer')
const path = require('path');
const upload = multer({ dest: path.join(__dirname, 'uploads/') });


const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));
app.use((req, res, next) => {
    console.log('Received request:', req.method, req.url);
    next();
  });
  

mongoose.connect('mongodb+srv://prakhar6601:HKcrgMLmZm02ZICu@cluster0.5y6azoj.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    uploadedImages: [
      {
        imageUrl: String,
        uploadedBy: String,
        timestamp: { type: Date, default: Date.now },
      },
    ],
  });
  
const User = mongoose.model('User', userSchema);

const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization;
  
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }
    console.log('Recevid Token:',token)
    jwt.verify(token, 'secret-key', (err, user) => {
        console.log('JWT Verify Result:', err, user);
      if (err) {
        console.error('Error verifying token:', err);
        return res.status(403).json({ message: 'Invalid token.' });
      }
  
      req.user = user;
      next();
    });
  };
  

app.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ username: user.username }, 'secret-key', { expiresIn: '5h' });

      res.status(200).json({ token });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
app.post('/upload', authenticateToken, upload.single('image'), async (req, res) => {
    try {
        console.log('Received token in /upload:', req.headers.authorization); // Log token
        console.log('Decoded user in /upload:', req.user); // Log decoded user
        console.log('File information:', req.file); // Log file information

        const { user } = req;
        const imageUrl = `http://localhost:3001/uploads/${req.file.filename}`;

        // Find the user
        const existingUser = await User.findOne({ username: user.username });


        if (!existingUser) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Update user's schema with the uploaded image information
        existingUser.uploadedImages.push({
            imageUrl,
            uploadedBy: user.username,
        });

        // Save the updated user document
        const updateResult = await existingUser.save();

        console.log('MongoDB Update Result:', updateResult);

        if (!updateResult) {
            // If the update did not modify any document, handle accordingly
            return res.status(404).json({ message: 'User not found or document not modified.' });
        }

        res.status(200).json({ message: 'Image uploaded successfully' });
    } catch (error) {
        console.error('Error uploading image:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/images', async (req, res) => {
  try {
    console.log('Received GET request to /images'); // Log the request
    // Find all users with their uploaded images
    const usersWithImages = await User.find({}, { username: 1, uploadedImages: 1 });

    // Map the response to include only necessary information
    const formattedImages = usersWithImages.map((user) => ({
      username: user.username,
      uploadedImages: user.uploadedImages.map((image) => ({
        imageUrl: image.imageUrl,
        uploadedBy: image.uploadedBy,
        timestamp: image.timestamp,
      })),
    }));

    res.status(200).json(formattedImages);
  } catch (error) {
    console.error('Error fetching images:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

  

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

