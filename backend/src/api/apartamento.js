const express = require('express')
const { apartamento } = require('../models')
const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const apartamentos = await apartamento.findAll()
    res.status(200).json(apartamentos)
  } catch (err) {
    res.status(500).json({ erro: err.message })
  }
})

router.post('/', async (req, res) => {
  try {
    const { numero } = req.body

    if (!numero) {
      return res.status(400).json({ erro: 'Número do apartamento é obrigatório' })
    }

    const jaExiste = await apartamento.findOne({ where: { numero } })

    if (jaExiste) {
      return res.status(409).json({ erro: 'Já existe um apartamento com esse número' })
    }

    const novoApartamento = await apartamento.create({
      numero,
      estado: 'LIVRE'
    })

    res.status(201).json(novoApartamento)
  } catch (err) {
    res.status(500).json({ erro: err.message })
  }
})


router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { numero, estado } = req.body

    const estadosValidos = ['LIVRE', 'OCUPADO' , 'MANUTECAO']
    if (!estadosValidos.includes(estado)) {
      return res.status(400).json({
        erro: 'Estado inválido. Use LIVRE , OCUPADO  ou MANUTENÇÃO'
      })
    }

    const ap = await apartamento.findByPk(id)

    if (!ap) {
      return res.status(404).json({ erro: 'Apartamento não encontrado' })
    }

    ap.numero = numero
    ap.estado = estado
    await ap.save()

    res.status(200).json(ap)
  } catch (err) {
    res.status(500).json({ erro: err.message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params

    const ap = await apartamento.findByPk(id)

    if (!ap) {
      return res.status(404).json({ erro: 'Apartamento não encontrado' })
    }

    await ap.destroy()
    res.status(204).send()
  } catch (err) {
    res.status(500).json({ erro: err.message })
  }
})

module.exports = router
