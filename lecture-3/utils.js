const fun1 = () => {
  console.log("fun1 is working");
  return;
};

const fun2 = () => {
  console.log("fun2 is working");
  return;
};

// module.exports = fun1;
module.exports = { fun1, fun2 };
