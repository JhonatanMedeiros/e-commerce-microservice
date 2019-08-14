import db from '../models';
const Product = db.Product;

class ProductController {

  static async index(req, res) {
    try {
      const products = await Product.findAll();
      res.json(products);
    } catch (error) {
      res.status(500);
      res.json({ error, status: 500 });
    }

  }

  static async store(req, res) {
    try {
      const product = await Product.create(req.body);
      res.json(product);
    } catch (error) {
      res.status(500);
      res.json({ error, status: 500 });
    }
  }

  static async find(req, res) {
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
  }

  static async update(req, res) {
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
  }

  static async delete(req, res) {
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
  }

}

export default ProductController;
