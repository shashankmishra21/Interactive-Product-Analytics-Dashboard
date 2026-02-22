const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  const features = ["date_filter", "age_filter", "gender_filter", "bar_chart"];
  const genders = ["Male", "Female", "Other"];
  const ageGroups = [
    { min: 10, max: 17 },  // <18
    { min: 18, max: 40 },  // 18-40
    { min: 41, max: 70 },  // >40
  ];

  console.log("Seeding structured analytics data...");

  for (let month = 0; month < 12; month++) {
    for (let gender of genders) {
      for (let group of ageGroups) {

        const hashed = await bcrypt.hash("dummy", 10);

        const user = await prisma.user.create({
          data: {
            username: `user_${month}_${gender}_${group.min}`,
            password: hashed,
            age: Math.floor(Math.random() * (group.max - group.min + 1)) + group.min,
            gender,
          },
        });

        // Ensure minimum 10 entries per month per category
        for (let i = 0; i < 10; i++) {
          const feature =
            features[Math.floor(Math.random() * features.length)];

          const date = new Date();
          date.setMonth(date.getMonth() - month);
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
  }

  console.log("Structured seed completed");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });