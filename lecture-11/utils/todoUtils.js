const todoDataValidation = ({ todoText }) => {
  return new Promise((resolve, reject) => {
    if (!todoText) reject("Missing todo text");

    if (typeof todoText !== "string") reject("Todo  is not a text");

    if (todoText.length < 3 || todoText > 100)
      reject("Todo length should be 3-100");

    resolve();
  });
};

module.exports = { todoDataValidation };
