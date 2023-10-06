const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const app = express();

app.use(express.json());

// Middleware to check if the user is logged in (just a dummy check based on email for simplicity)
// app.use(async (req, res, next) => {
//     const userEmail = req.get('sean@gmail.com');
//     const user = await prisma.user.findUnique({ where: { email: userEmail } });
//     if (!user) {
//         return res.status(403).send('User not found');
//     }
//     req.user = user;
//     next();
// });

// // Endpoint to get all perfumes
app.get('/perfumes', async (req, res) => {
    const perfumes = await prisma.perfume.findMany();
    res.json(perfumes);
});


// app.get('/users', async (req, res) => {
//     const users = await prisma.user.findMany();
//     res.json(users);
// });





//CRUD actions

//Post Perfumes
app.post('/perfumes', async (req, res) => {
    const { name, category, color, price, rating } = req.body;
    const perfume = await prisma.perfume.create({
        data: {
            name,
            category,
            color,
            price,
            rating,
            userId: req.user.id
        }
    });
    res.json(perfume);
});


// Edit Perfume
app.put('/perfumes/:id', async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const perfume = await prisma.perfume.update({
        where: { id: Number(id) },
        data
    });
    res.json(perfume);
});



// Delete perfume
app.delete('/perfumes/:id', async (req, res) => {
    const { id } = req.params;
    const perfume = await prisma.perfume.delete({
        where: { id: Number(id) }
    });
    res.json(perfume);
});



//Find by ID
app.get('/perfumes/:id', async (req, res) => {
    const { id } = req.params;
    const perfume = await prisma.perfume.findUnique({
        where: { id: Number(id) }
    });
    res.json(perfume);
});


//Find by Other Criteria

// By category
app.get('/perfumes/category/:category', async (req, res) => {
    const { category } = req.params;
    const perfumes = await prisma.perfume.findMany({
        where: { category }
    });
    res.json(perfumes);
});

// By color
app.get('/perfumes/color/:color', async (req, res) => {
    const { color } = req.params;
    const perfumes = await prisma.perfume.findMany({
        where: { color }
    });
    res.json(perfumes);
});

// By price range
app.get('/perfumes/price-range', async (req, res) => {
    const { min, max } = req.query;
    const perfumes = await prisma.perfume.findMany({
        where: {
            price: {
                gte: parseFloat(min),
                lte: parseFloat(max)
            }
        }
    });
    res.json(perfumes);
});

// By rating
app.get('/perfumes/rating/:rating', async (req, res) => {
    const { rating } = req.params;
    const perfumes = await prisma.perfume.findMany({
        where: { rating: parseFloat(rating) }
    });
    res.json(perfumes);
});















const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
