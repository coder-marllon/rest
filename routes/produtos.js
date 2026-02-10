const express = require('express');
const router = express.Router();
const mysql = require('../mysql');

// RETORNA TODOS OS PRODUTOS
router.get('/', (req, res, next) => {
  res.status(200).send({
    mensagem: 'Retorna todos os produtos'
  });
});

// INSERE UM PRODUTO
router.post('/', (req, res, next) => {

  mysql.getConnection((error, conn) => {

    if (error) {
      return res.status(500).send({
        error: error.message
      });
    }

    conn.query(
      'INSERT INTO produtos (nome, preco) VALUES (?, ?)',
      [req.body.nome, req.body.preco],
      (error, resultado, field) => {
        conn.release();

        if (error) {
          return res.status(500).send({
            error: error.message
          });
        }

        res.status(201).send({
          mensagem: 'Produto inserido com sucesso',
          id_produto: resultado.insertId
        });
      }
    );
  });
});

// RETORNA OS DADOS DE UM PRODUTO
router.get('/:id_produto', (req, res, next) => {
  const id = req.params.id_produto

  if (id === 'especial') {
    res.status(200).send({
      mensagem: 'Você descobriu o ID especial',
      id: id
    })  
  } else {
    res.status(200).send({
      mensagem: 'Você passou um ID'
    })
  }
})

// ALTERA UM PRODUTO
router.patch('/', (req, res, next) => {
  res.status(201).send({
    mensagem: 'Produto alterado'
  })
});

// EXCLUI UM PRODUTO
router.delete('/', (req, res, next) => {
  res.status(201).send({
    mensagem: 'Produto excluído'
  })
});


module.exports = router;