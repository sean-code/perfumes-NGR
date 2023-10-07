const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const users = [
  { email: 'sean@gmail.com', password: '12345' },
  { email: 'jane@gmail.com', password: 'abcde' },
  { email: 'alice@gmail.com', password: 'password1' },
  // ... you can add more users
];

const perfumeNames = ['Elysium', 'Aventus', 'Oud Wood', 'Bleu de Chanel', 'Sauvage', 'Tobacco Vanille', 'Green Irish Tweed', 'Terre d’Hermès']; // ... Add more names
const randomImages = ['https://odour-demo.myshopify.com/cdn/shop/products/product_06.png?v=1561605963', 'https://odour-demo.myshopify.com/cdn/shop/products/product_12.png?v=1561605965', 'https://odour-demo.myshopify.com/cdn/shop/products/product_05.png?v=1561605955' ];

const randomDigits = ['245', '7382', '972q7', '889j', '9866k', '9762l', '6353f'];
const loremIpsum = ['we denounce with righteous indignation...', 'dislike men who are so beguiled....', 'and demoralized by the charms...', 'pleasure of the moment...', 'so blinded by desire, that they cannot foresee', 'the pain and trouble that...']

const categories = ['Floral', 'Woody', 'Fresh', 'Oriental', 'New Products', 'popular items', 'Trending Item'];
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
  const allPerfumes = await prisma.perfume.findMany();

  for (let i = 0; i < 20; i++) {
    const randomUser = getRandomItem(allUsers);
    const randomPerfume = getRandomItem(allPerfumes);

    await prisma.cart.create({
      data: {
        userId: randomUser.id,
        perfumeId: randomPerfume.id,
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
