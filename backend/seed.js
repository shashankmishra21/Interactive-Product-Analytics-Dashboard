const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding production data...");

  const hashed = await bcrypt.hash("password", 10);

  const features = ["date_filter", "age_filter", "gender_filter", "bar_chart"];
  const genders = ["Male", "Female", "Other"];

  for (let i = 1; i <= 20; i++) {
    const username = `user${i}`;

    const user = await prisma.user.upsert({
      where: { username },
      update: {
        password: hashed, // ensure correct password
      },
      create: {
        username,
        password: hashed,
        age: 18 + (i % 40),
        gender: genders[i % 3],
      },
    });

    const existingClicks = await prisma.featureClick.count({
      where: { userId: user.id },
    });

    if (existingClicks === 0) {
      for (let j = 0; j < 20; j++) {
        const feature =
          features[Math.floor(Math.random() * features.length)];

        const date = new Date();
        date.setMonth(date.getMonth() - Math.floor(Math.random() * 12));
        date.setDate(Math.floor(Math.random() * 28) + 1);

        await prisma.featureClick.create({
          data: {
            userId: user.id,
            featureName: feature,
            timestamp: date,
          },
        });
      }
    }
  }

  console.log("Seed completed successfully");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });