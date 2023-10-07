
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const users = [
    { email: 'sean@gmail.com', password: '12345' },
    { email: 'jane@gmail.com', password: 'abcde' },
    { email: 'alice@gmail.com', password: 'password1' },
    // ... you can add more users
];

const perfumeNames = ['Elysium', 'Aventus', 'Oud Wood', 'Bleu de Chanel', 'Sauvage', 'Tobacco Vanille', 'Green Irish Tweed', 'Terre d’Hermès']; // ... Add more names

const categories = ['Floral', 'Woody', 'Fresh', 'Oriental'];
const colors = ['Red', 'Brown', 'Blue', 'Green', 'Yellow'];
const ratings = [3.5, 4.0, 4.5, 5.0];

function getRandomItem(array) {
    return array[Math.floor(Math.random() * array.length)];
}

async function main() {
    for (let userData of users) {
        await prisma.user.create({
            data: userData
        });
    }

    const allUsers = await prisma.user.findMany();

    for (let i = 0; i < 40; i++) {
        await prisma.perfume.create({
            data: {
                name: getRandomItem(perfumeNames),
                category: getRandomItem(categories),
                color: getRandomItem(colors),
                price: Math.floor(Math.random() * 150) + 50, // Price between 50 and 200
                rating: getRandomItem(ratings),
                userId: getRandomItem(allUsers).id
            }
        });
    }
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
