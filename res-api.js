const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
app.use(
  cors({ 
      origin: 'http://localhost:4200', 
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      allowedHeaders: [
          'Content-Type', 
          'Authorization', 
          'Origin', 
          'x-access-token', 
          'XSRF-TOKEN'
      ], 
      preflightContinue: false 
  })
);
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Mongo db
var mongoose = require('mongoose');
mongoose.connect("mongodb+srv://dnz:JZbvc7S1s91vawb2@cluster0-h7yb7.mongodb.net/test?retryWrites=true&w=majority", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}).then(() => console.log('DB Connected!'))
  .catch(err => {
    console.log(err);
  });


var User = require('./user.js');
var Item = require('./item.js');
var Order = require('./order.js');
app.use(express.json());
// 


// Routes ===========================================
app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    res.send(user);
    if (!user) res.status(404).send("No item found")
    res.status(200).send()
  } catch (err) {
    res.status(500).send(err)
  }
})
// Goruntuleme
  app.get('/users', async (req, res) => {
    const user = await User.find({});

    try {
      res.send(user);
    } catch (err) {
      res.status(500).send(err);
    }
  });
  // Ekleme POST http://localhost:3000/users)
  app.post('/users',async (req, res) => {
    const user = new User(req.body);
    try {
      await user.save();
      res.send(user);
    } catch (err) {
      res.status(500).send(err);
    }
  });
  // -Silme http://localhost:3000/users/:id
  app.delete('/users/:id', async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id)
  
      if (!user) res.status(404).send("No item found")
      res.status(200).send()
    } catch (err) {
      res.status(500).send(err)
    }
  })
// Guncelleme  http://localhost:3000/items/:id
  app.put('/users/:id', async (req, res) => {
    try {
      await User.findByIdAndUpdate(req.params.id, req.body)
      await User.save()
      res.send(food)
    } catch (err) {
      res.status(500).send(err)
    }
  })
// /items/5e80e72f73b67c09407ecd38 olarak donduruyor. tekli silme ve update işleminde kullanılacak.
app.get('/items/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id)
    res.send(item);
    if (!item) res.status(404).send("No item found")
    res.status(200).send()
  } catch (err) {
    res.status(500).send(err)
  }
})
// Goruntuleme
  app.get('/items', async (req, res) => {
    const items = await Item.find({});

    try {
      res.send(items);
    } catch (err) {
      res.status(500).send(err);
    }
  });
  // Ekleme POST http://localhost:3000/items)
  app.post('/items',async (req, res) => {
    const item = new Item(req.body);
    try {
      await item.save();
      res.send(item);
    } catch (err) {
      res.status(500).send(err);
    }
  });
  // -Silme http://localhost:3000/items/:id
  app.delete('/items/:id', async (req, res) => {
    try {
      const item = await Item.findByIdAndDelete(req.params.id)
  
      if (!item) res.status(404).send("No item found")
      res.status(200).send()
    } catch (err) {
      res.status(500).send(err)
    }
  })
// Guncelleme  http://localhost:3000/items/:id
  app.put('/items/:id', async (req, res) => {
    try {
      await Item.findByIdAndUpdate(req.params.id, req.body)
      await Item.save()
      res.send(food)
    } catch (err) {
      res.status(500).send(err)
    }
  })
//=======================================================
app.listen(port, () => console.log(`Api calisiyor  port ${port}!`));

