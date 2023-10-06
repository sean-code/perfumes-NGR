const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const user = await prisma.user.create({
    data: {
      email: 'sean@gmail.com',
      password: '12345',
    },
  })
  console.log({ user })
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
