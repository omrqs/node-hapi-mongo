import Model from './../models/user.js';

class UserSeed {
  constructor() {
    this.users = [
      {
        fullname: "First User",
        email: "first@user.io",
        password: "firstuser"
      },
      {
        fullname: "Second User",
        email: "second@user.io",
        password: "seconduser"
      }
    ];
  }

  async tearUp () {
    return this.users.map(entry => {
      return Model.create(entry)
        .then(async (user) => {
          console.info(`user ${user.fullname} was created`);
        })
        .catch(() => {
          console.error(`failed to save user ${entry.fullname}`);
        });
    });
  }

  async tearDown () {
    return this.users.map(async entry => {
      const user = await Model.findOneByUsername(entry.email);

      if (user) {
        return Model.findByIdAndDelete(user.id).lean().exec()
          .then(() => {
            console.info(`user ${entry.fullname} was deleted`);
          })
          .catch(() => {
            console.error(`failed to delete user ${entry.fullname}`);
          });
      }
    });
  }
}

const seed = new UserSeed;

export default seed;
