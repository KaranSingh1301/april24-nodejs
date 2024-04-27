const userSchema = require("../schemas/userSchema");
const bcrypt = require("bcryptjs");
const { ObjectId } = require("mongodb");

const User = class {
  username;
  name;
  email;
  password;

  constructor({ email, username, password, name }) {
    this.username = username;
    this.name = name;
    this.password = password;
    this.email = email;
  }

  registerUser() {
    return new Promise(async (resolve, reject) => {
      const hashedPassword = await bcrypt.hash(
        this.password,
        Number(process.env.SALT)
      );

      const userObj = new userSchema({
        name: this.name,
        email: this.email,
        password: hashedPassword,
        username: this.username,
      });

      try {
        const userDb = await userObj.save();
        resolve(userDb);
      } catch (error) {
        reject(error);
      }
    });
  }

  static emailAndUsernameExist({ username, email }) {
    return new Promise(async (resolve, reject) => {
      try {
        const userDb = await userSchema.findOne({
          $or: [{ username: username }, { email: email }],
        });

        if (userDb && email === userDb.email) reject("Email already exist");
        if (userDb && username === userDb.username)
          reject("Username already exist");

        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  static findUserWithKey({ key }) {
    return new Promise(async (resolve, reject) => {
      try {
        const userDb = await userSchema
          .findOne({
            $or: [
              ObjectId.isValid(key) ? { _id: key } : { username: key },
              { email: key },
            ],
          })
          .select("+password");
        if (!userDb) reject("User not found");
        resolve(userDb);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }
};

module.exports = User;
