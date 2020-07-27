import User from './user.seed.js';

const up = async () => {
  await User.tearUp()
};

up();
