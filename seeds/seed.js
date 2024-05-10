const sequelize = require('../config/connection');
const { User, Blog, Comment } = require('../models');
const userData = require('./userData.json');
const blogData = require('./blogData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
      individualHooks: true,
      returning: true,
    });

    for (const blog of blogData) {
      const createdBlog = await Blog.create({
        ...blog,
        user_id: users[Math.floor(Math.random() * users.length)].id,
      });

      for (const comment of commentData) {
        await Comment.create({
          ...comment,
          blog_id: createdBlog.id,
          user_id: users[Math.floor(Math.random() * users.length)].id,
        });
      }
    }

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    process.exit(0);
  }
};

seedDatabase();
