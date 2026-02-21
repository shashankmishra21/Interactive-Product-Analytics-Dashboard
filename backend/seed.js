const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const features = ["date_filter", "age_filter", "gender_filter", "bar_chart"];

  for (let i = 1; i <= 10; i++) {
    const user = await prisma.user.create({
      data: {
        username: "user" + i,
        password: "dummy",
        age: Math.floor(Math.random() * 50) + 18,
        gender: ["Male", "Female", "Other"][Math.floor(Math.random() * 3)],
      },
    });

    for (let j = 0; j < 10; j++) {
      await prisma.featureClick.create({
        data: {
          userId: user.id,
          featureName: features[Math.floor(Math.random() * features.length)],
          timestamp: new Date(
            Date.now() - Math.floor(Math.random() * 1000000000)
          ),
        },
      });
    }
  }

  console.log("Seed data inserted");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());