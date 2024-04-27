const blogDataValidator = ({ title, textBody }) => {
  return new Promise((resolve, reject) => {
    if (!title || !textBody) reject("Missing Blog Data");

    if (typeof title !== "string") reject("Title is not a text");
    if (typeof textBody !== "string") reject("TextBody is not a text");

    resolve();
  });
};

module.exports = { blogDataValidator };
