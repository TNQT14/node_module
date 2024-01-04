import express, { Router } from 'express'
const router = express.Router()

router.get('/', (req, res) => {
    res.send('GET students')
})

router.get('/:id', (req, res) => {
    res.send('GET details info students')
})

router.patch('/insert', (req, res) => {
    res.send('Insert(create new object if not exists) student')
})

router.post('/update', (req, res) => {
    res.send('Update info student')
})

router.post('/delete', (req, res) => {
    res.send('Delete student')
})

export default router