import User from './user.seed.js';

const down = async () => {
  await User.tearDown();
};

down();
