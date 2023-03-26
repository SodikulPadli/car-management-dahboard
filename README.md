# Car Management Dashboard

Ini adalah dashboard manajemen mobil sederhana yang dibangun dengan teknologi Node.js, Express, dan PostgreSQL. Dashboard ini memungkinkan pengguna untuk melakukan operasi CRUD pada data mobil, seperti menambahkan mobil baru, memperbarui informasi mobil, dan menghapus mobil dari database.
Cara Menjalankan Aplikasi

### Desain ERD
![ERD](https://user-images.githubusercontent.com/57209543/227772894-fd752f8f-78b3-45be-af4a-aed2786484d5.PNG)


## Untuk menjalankan aplikasi ini di komputer lokal Anda, pastikan Node.js, PostgreSQL, dan Git sudah terinstal. Kemudian, ikuti langkah-langkah di bawah ini:

1. Clone repositori ini dengan perintah git clone https://github.com/SodikulPadli/car-management-dashboard.git.
2. Masuk ke direktori repositori dengan perintah cd car-management-dashboard.
3. Jalankan perintah npm install untuk menginstal semua dependensi.
4. Buat database PostgreSQL baru dengan nama "carsRental".
5. Ubah nilai konfigurasi database pada file config/config.json dengan username, password, host, dan port PostgreSQL Anda.
6. Jalankan perintah npm run start untuk memulai server.
7. Buka browser dan akses http://localhost:8000 untuk melihat dashboard.

## Fitur-Fitur Aplikasi

- Halaman Cars: Menampilkan daftar mobil yang ada di database dan memungkinkan pengguna untuk menambahkan, memperbarui, dan menghapus mobil.
 
 ## End Point API 
- Menapilkan daftar mobil
```
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
```

- Menambahkan mobil

```
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
       
    } catch (error) {
        res.status(400).json({
            message: "Error",
            data: error
        })
    }
    
})
```

- Mengahapus mobil

```
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
```

- Mengedit / update mobil

```
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
```
## Kontribusi
- Selalu terbuka untuk kontribusi dari para pengembang. Jika Anda ingin berkontribusi pada proyek ini, silakan buat pull request dan kami akan mereviewnya secepat mungkin.
