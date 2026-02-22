const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  const features = ["date_filter", "age_filter", "gender_filter", "bar_chart"];
  const genders = ["Male", "Female", "Other"];

  for (let i = 1; i <= 40; i++) {
    const hashed = await bcrypt.hash("dummy", 10);

    // create user
    const user = await prisma.user.create({
      data: {
        username: "user" + i,
        password: hashed,
        age: Math.floor(Math.random() * 60) + 18,
        gender: genders[Math.floor(Math.random() * genders.length)],
      },
    });

    // create clicks
    for (let j = 0; j < 25; j++) {
      const randomDaysAgo = Math.floor(Math.random() * 365);

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

  console.log("Seed completed");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });