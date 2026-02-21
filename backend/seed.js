const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const features = ["date_filter", "age_filter", "gender_filter", "bar_chart"];

  for (let i = 1; i <= 40; i++) {
    const user = await prisma.user.create({
      data: {
        username: "user" + i,
        password: "dummy",
        age: Math.floor(Math.random() * 70) + 10,
        gender: ["Male", "Female", "Other"][Math.floor(Math.random() * 3)],
      },
    });

    for (let j = 0; j < 25; j++) {
      const randomDaysAgo = Math.floor(Math.random() * 365); // last 1 year

      await prisma.featureClick.create({
        data: {
          userId: user.id,
          featureName: features[Math.floor(Math.random() * features.length)],
          timestamp: new Date(
            Date.now() - randomDaysAgo * 24 * 60 * 60 * 1000
          ),
        },
      });
    }
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());