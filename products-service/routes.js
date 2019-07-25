const express = require('express');
const router = express.Router();

const { Product } = require('./models');

/* Get all Products */
router.get('/findall', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500);
    res.json({ error, status: 500 });
  }
});

/* Create an Product */
router.post('/register', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.json(product);
  } catch (error) {
    res.status(500);
    res.json({ error, status: 500 });
  }
});

/* Get Product by ID*/
router.get('/find/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (product) {
      res.json(product);
    } else {
      res.status(404);
      res.json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500);
    res.json({ error, status: 500 });
  }
});

/* Update an Product */
router.put('/update/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.update(
      req.body,
      {
        returning: true,
        limit: 1,
        where: { id }
      }
    );
    if (product && product.length) {
      res.json(product[1][0]);
    } else if (!product) {
      res.status(404);
      res.json({ message: 'Product not found' });
    } else {
      res.json(product);
    }
    new Error('Product update error.');
  } catch (error) {
    res.status(500);
    res.json({ error, status: 500 });
  }
});

/* Delete an Product */
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.destroy({ where: { id } });
    if (product) {
      res.json({ message: 'Product deleted' })
    } else {
      res.status(404);
      res.json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500);
    res.json({ error, status: 500 });
  }
});

router.get('/ping', (req, res) => {
  res.json({ msg: 'pong' });
});

module.exports = router;
