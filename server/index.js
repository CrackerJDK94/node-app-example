const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()

const FoodModel = require("./models/Food");

app.use(express.json())
app.use(cors())

mongoose.set('strictQuery', true)

mongoose.connect("mongodb+srv://root:root1234@cluster0.5hhvnou.mongodb.net/food?retryWrites=true&w=majority", {
    useNewUrlParser: true
})

app.post('/insert', async (req, res) => {

    const foodName = req.body.foodName
    const days = req.body.days
    const food = new FoodModel({foodName: foodName, daysSinceIAte: days});
    try {
        await food.save()
    } catch(err) {
        console.log(err);
    }
})

app.get('/read', async (req, res) => {
    FoodModel.find({}, (err, result) => {
        if(err) {
            res.send(err)
        }

        res.send(result);
    })
})

app.put('/update', async (req, res) => {

    const newFoodName = req.body.newFoodName
    console.log(newFoodName);
    const id = req.body.id
    try {
        await FoodModel.findById(id, (err, updatedFood) => {
            console.log(updatedFood);
            updatedFood.foodName = newFoodName
            updatedFood.save()
        })
    } catch(err) {
        console.log(err);
    }
})

app.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    console.log(id);
    await FoodModel.findByIdAndDelete(id).exec()
    res.send("deleted")
})

app.listen(3001, () => {
    console.log('Server is running on port 3001...');
})
