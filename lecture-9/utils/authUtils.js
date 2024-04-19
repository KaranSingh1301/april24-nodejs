const isEmailRgex = ({ str }) => {
  const isEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(
      str
    );
  return isEmail;
};

const userDataValidation = ({ name, email, username, password }) => {
  return new Promise((resolve, reject) => {
    if (!name || !username || !email || !password)
      reject("Missing user credentials");

    if (typeof name !== "string") reject("name is not a text");
    if (typeof email !== "string") reject("email is not a text");
    if (typeof password !== "string") reject("password is not a text");
    if (typeof username !== "string") reject("username is not a text");

    if (username.length < 3 || username.length > 50)
      reject("username length should be 3-50");

    if (!isEmailRgex({ str: email })) reject("Email format is incorect");

    resolve();
  });
};

module.exports = { userDataValidation, isEmailRgex };
