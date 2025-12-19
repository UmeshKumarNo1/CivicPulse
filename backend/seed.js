const { sequelize, User, Problem, Comment, Upvote } = require('./models');
require('dotenv').config();

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');

    // Sync database (drop and recreate tables)
    await sequelize.sync({ force: true });
    console.log('✅ Database synced.');

    // Create users
    const users = await User.bulkCreate([
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        role: 'user',
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'password123',
        role: 'user',
      },
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'admin123',
        role: 'admin',
      },
      {
        name: 'Bob Johnson',
        email: 'bob@example.com',
        password: 'password123',
        role: 'user',
      },
    ], { individualHooks: true });
    console.log('✅ Users created.');

    // Create problems
    const problems = await Problem.bulkCreate([
      {
        title: 'Broken Street Light on Main Street',
        description: 'The street light near the intersection of Main St and 5th Ave has been broken for over a week. This creates a safety hazard for pedestrians at night.',
        location: 'Main Street & 5th Avenue',
        status: 'Pending',
        userId: users[0].id,
      },
      {
        title: 'Pothole on Highway 101',
        description: 'Large pothole on Highway 101 near exit 23. It\'s causing damage to vehicles and is a serious safety concern.',
        location: 'Highway 101, Exit 23',
        status: 'In Progress',
        userId: users[1].id,
      },
      {
        title: 'Overflowing Garbage Bins in Central Park',
        description: 'The garbage bins in Central Park have been overflowing for days. This is attracting pests and creating an unsanitary environment.',
        location: 'Central Park',
        status: 'Pending',
        userId: users[0].id,
      },
      {
        title: 'Graffiti on Public Library Wall',
        description: 'Vandals have spray-painted graffiti on the exterior wall of the public library. It needs to be cleaned as soon as possible.',
        location: 'Public Library, 123 Library Lane',
        status: 'Resolved',
        userId: users[3].id,
      },
      {
        title: 'Broken Playground Equipment',
        description: 'The swing set at Riverside Park is broken and poses a danger to children. One of the swings has a broken chain.',
        location: 'Riverside Park',
        status: 'In Progress',
        userId: users[1].id,
      },
      {
        title: 'Illegal Dumping on Oak Street',
        description: 'Someone has illegally dumped construction debris on Oak Street. This is blocking the sidewalk and creating a hazard.',
        location: 'Oak Street, near 10th Avenue',
        status: 'Pending',
        userId: users[3].id,
      },
    ]);
    console.log('✅ Problems created.');

    // Create comments
    await Comment.bulkCreate([
      {
        text: 'I noticed this too! It\'s really dangerous at night.',
        userId: users[1].id,
        problemId: problems[0].id,
      },
      {
        text: 'Has anyone reported this to the city?',
        userId: users[3].id,
        problemId: problems[0].id,
      },
      {
        text: 'I called the city maintenance department. They said they\'ll fix it this week.',
        userId: users[0].id,
        problemId: problems[0].id,
      },
      {
        text: 'This pothole damaged my tire yesterday!',
        userId: users[0].id,
        problemId: problems[1].id,
      },
      {
        text: 'I saw a crew working on this yesterday. Should be fixed soon.',
        userId: users[3].id,
        problemId: problems[1].id,
      },
      {
        text: 'The smell is terrible. This needs immediate attention.',
        userId: users[1].id,
        problemId: problems[2].id,
      },
      {
        text: 'Great to see this was resolved quickly!',
        userId: users[0].id,
        problemId: problems[3].id,
      },
      {
        text: 'My kids love this park. Please fix this ASAP!',
        userId: users[0].id,
        problemId: problems[4].id,
      },
    ]);
    console.log('✅ Comments created.');

    // Create upvotes
    await Upvote.bulkCreate([
      { userId: users[0].id, problemId: problems[1].id },
      { userId: users[1].id, problemId: problems[1].id },
      { userId: users[3].id, problemId: problems[1].id },
      { userId: users[0].id, problemId: problems[2].id },
      { userId: users[1].id, problemId: problems[2].id },
      { userId: users[1].id, problemId: problems[0].id },
      { userId: users[3].id, problemId: problems[0].id },
      { userId: users[0].id, problemId: problems[4].id },
      { userId: users[1].id, problemId: problems[4].id },
      { userId: users[3].id, problemId: problems[4].id },
      { userId: users[0].id, problemId: problems[5].id },
    ]);
    console.log('✅ Upvotes created.');

    console.log('\n🎉 Database seeding completed successfully!\n');
    console.log('📝 Sample Users:');
    console.log('   User: john@example.com / password123');
    console.log('   User: jane@example.com / password123');
    console.log('   Admin: admin@example.com / admin123');
    console.log('   User: bob@example.com / password123\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();

