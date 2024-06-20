const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Client } = require('pg');



const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(cors());

const client = new Client({
  host: "database",
  user: "oclock",
  password: "passw0rd",
  database: "shop"
})

client.connect(function (err) {
  if (err) throw err;
  console.log("🟢 Connected to database");
});




const getCart = async (client, id) => {
  const sql = `
      SELECT 
        cart.user_id, product.*, pivot_cart_product.quantity
      FROM shop.cart
        left join shop.pivot_cart_product ON cart.id = cart_id
        left join shop.product ON product.id = product_id
      WHERE cart.id = $1
  `;

  const result = await client.query(sql, [id])

  const products = result.rows;
  const cart = {
    id: id,
    products: products,
    total: 0,
    userId: null,
    totalProducts: result.rowCount,
    totalQuantity: 0
  };

  if (result.rowCount > 0) {
    cart.userId = products[0].user_id;
    cart.total = products.reduce((acc, product) => acc + product.price * product.quantity, 0);
    cart.totalQuantity = products.reduce((acc, product) => acc + product.quantity, 0);
  }

  return cart;
};

const addProduct = async (client, cart_id, product, merge) => {
  // Supprime tous les produits du panier
  if (!merge) {
    await client.query('DELETE FROM shop.pivot_cart_product WHERE cart_id = $1', [cart_id]);
  }

  const isexist = await client.query('SELECT count(*) FROM shop.pivot_cart_product WHERE cart_id = $1 AND product_id = $2', [cart_id, product.id]);

  if (isexist.rows[0].count > 0) {
    await client.query('UPDATE shop.pivot_cart_product SET quantity = quantity + $1 WHERE cart_id = $2 AND product_id = $3', [product.quantity, cart_id, product.id]);
  }
  else {
    await client.query('INSERT INTO shop.pivot_cart_product (cart_id, product_id, quantity) VALUES ($1, $2, $3)', [cart_id, product.id, product.quantity]);
  }
}


/* HELLO WORLD */
app.get('/', (req, res) => {
  return res.status(200).json({ message: "Hello World 💗" });
});


/* USERS */
app.get('/users', (req, res) => {
  client.query('SELECT * FROM shop.user')
    .then((result) => {
      const users = result.rows;
      res.json({
        users: users,
        total: users.length,
        skip: 0,
        limit: 30
      });
    })
    .catch(error => {
      return res.status(500).json({ message: error });
    });
});

app.get('/users/:id', (req, res) => {
  client.query('SELECT * FROM shop.user WHERE id = $1', [req.params.id])
    .then((result) => {
      const user = result.rows;
      if (user.length > 0) {
        res.json(user[0]);
      }
      else {
        res.status(404).json({ message: 'User not found' });
      }
    })
    .catch(error => {
      return res.status(500).json({ message: error });
    });
});


/* PRODUCTS */
app.get('/products', (req, res) => {
  client.query('SELECT * FROM shop.product')
    .then((result) => {
      const products = result.rows;
      res.json({
        products: products,
        total: products.length,
        skip: 0,
        limit: 30
      });
    })
    .catch(error => {
      return res.status(500).json({ message: error });
    });
});

app.get('/products/:id', (req, res) => {
  client.query('SELECT * FROM shop.product WHERE id = $1', [req.params.id])
    .then((result) => {
      const product = result.rows;
      if (product.length > 0) {
        res.json(product[0]);
      }
      else {
        res.status(404).json({ message: 'Product not found' });
      }
    })
    .catch(error => {
      return res.status(500).json({ message: error });
    });
});


/* USER'S CARTS */
app.get('/carts/users/:id', (req, res) => {
  client.query('SELECT * FROM shop.cart WHERE user_id = $1', [req.params.id])
    .then((result) => {
      const carts = result.rows;
      const response = {
        total: carts.length,
        skip: 0,
        limit: 1,
        carts: []
      }

      Promise.all(carts.map(cart => getCart(client, cart.id)))
        .then(carts => {
          response.carts = carts;
          res.json(response);
        })
        .catch(error => {
          return res.status(500).json({ message: error });
        });
    })
    .catch(error => {
      return res.status(500).json({ message: error });
    });
});

app.post('/carts/add', async (req, res) => {
  const { userId, products } = req.body;

  // Crée un panier vide pour un user
  client.query('INSERT INTO shop.cart (user_id) VALUES ($1) RETURNING *', [userId])
    .then((result) => {
      const cart = result.rows[0];

      res.json({
        id: cart.id,
        products: [],
        total: 0,
        userId: userId,
        totalProducts: 0,
        totalQuantity: 0
      });
    })
    .catch(error => {
      return res.status(500).json({ message: error });
    });
});


/* CARTS */
app.get('/carts/:id', (req, res) => {
  getCart(client, req.params.id).then(cart => {
    return res.json(cart);
  }).catch(error => {
    return res.status(500).json({ message: error });
  });
});

app.put('/carts/:id', async (req, res) => {
  const { merge, products } = req.body;
  const cart_id = req.params.id;

  Promise.all(products.map(product => addProduct(client, cart_id, product, merge)))
    .then(() => {
      getCart(client, cart_id).then(cart => {
        return res.json(cart);
      }).catch(error => {
        return res.status(500).json({ message: error });
      });
    }).catch(error => {
      return res.status(500).json({ message: error });
    });
});

app.delete('/carts/:id', (req, res) => {
  client.query('DELETE FROM shop.cart WHERE id = $1', [req.params.id])
    .then((result) => {
      res.json({ message: 'Item deleted' });
    })
    .catch(error => {
      return res.status(500).json({ message: error });
    });
});




app.listen(port, () => {
  console.log(`Backend (${port})`);
});