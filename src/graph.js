const userAction = async () => {
  const response = await fetch("http://locahost:3000/listUsers");
  const myJson = await response.json();
  console.log(myJson);
};
