const express = require("express");
const app = express();
const uploadMemory = require("./middleware/uploadMemory");
const cloudinary = require("./config/cloudinary");
const CarController = require("./carsController");
const { PORT = 8000 } = process.env;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs')
app.use(express.json())


//list
app.get('/api/v1/cars', async (req, res) => {
    try {
        const cars = await CarController.list();
        res.status(200).json(cars)
    } catch (error) {
        res.status(400).json({
            message: "Error",
            data: error
        })
    }
})
//detail
app.get('/api/v1/car/:id', async (req, res) => {
    try {
        const car = await CarController.find(req.params.id);
        if (!car) throw Error("Not Found")
       res.render("editCar",{car})
        //res.status(200).json(car)
    } catch (error) {
        res.status(404).json({
            message: "Error",
            data: error
        })
    }
   
})
//create
app.post('/api/v1/car', async (req, res) => {
    try {
        const data = {
            car_name: req.body.car_name,
            car_type: req.body.car_type,
            rental_price:req.body.rental_price
        }
        console.log(data);
        const car = await CarController.create(data);
        res.redirect("/")
        // res.status(201).json({
        //     message: "Sukses",
        //     data: car
        // })
    } catch (error) {
        res.status(400).json({
            message: "Error",
            data: error
        })
    }
    
})
// update / edit
app.patch('/api/v1/car/:id', async (req, res) => {
    try {
        const car = await CarController.update(req.params.id, req.body);
        res.status(200).json({
            message: "Sukses",
            data: car
        })
    } catch (error) {
        res.status(400).json({
            message: "Error",
            data: error
        })
    }
})

// delete
app.delete('/api/v1/car/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id)
        const car = await CarController.delete(id);
        res.status(204).json({
            message: "Sukses",
            data: car
        })
    } catch (error) {
        res.status(400).json({
            message: "Error",
            data: error
        })
    }
})

app.post('/api/v1/upload/cloudinary', uploadMemory.single("picture"), (req, res) => {
    const fileBase64 = req.file.buffer.toString("base64")
    const file = `data:${req.file.mimetype};base64,${fileBase64}`
    
    cloudinary.uploader.upload(file, (err, result) => {
        if(!!err){
            console.log(err)
            return res.status(400).json({
                message: "Gagal upload file"
            })
        }

        res.status(201).json({
            message: "Upload file berhasil",
            url: result.url
        })
    })
})

app.get('/', async (req, res) => {
    let data = []
    try {
        const cars = await CarController.list(req.body);
        data = cars;
    } catch (error) {
        console.log(error)
    }
    res.render("index", {data:data})
})
app.get('/add', (req, res) => {
    res.render('addCar');
})
app.get('/editCar/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const car = await CarController.find(id);
    res.render('editCar', { car });
  } catch (error) {
    res.status(400).json({
      message: 'Error',
      data: error,
    });
  }
});
app.post('/api/v1/updateCar/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const car = await CarController.update(id, req.body);
    res.status(200).json({
      message: 'Success',
      data: car,
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error',
      data: error,
    });
    }
    
});

app.use((req, res) => {
    res.status(404).send("Mau kemana bos?")
})

app.listen(PORT, () => {
    console.log(`Server nyala di http://localhost:${PORT}`)
})
