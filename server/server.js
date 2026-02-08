const siteRoutes = require('./routes/sites'); 
const siteRoutes = require('./routes/sites');
const likeRoutes = require('./routes/likes');
const notificationRoutes = require('./routes/notifications');
const commentRoutes = require('./routes/comments');
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.get('/', (req, res) => res.send('API Running'));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
app.use('/api/sites', siteRoutes);
app.use('/api/sites', siteRoutes);
app.use('/api/likes', likeRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/notifications', notificationRoutes);



const server = require('http').createServer(app);
const io = require('socket.io')(server, { cors: { origin: '*' } });

io.on('connection', socket => {
  console.log('User connected to Socket.IO');

  socket.on('like', data => io.emit('notification', data));
  socket.on('comment', data => io.emit('notification', data));
});

// Replace app.listen with:
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
