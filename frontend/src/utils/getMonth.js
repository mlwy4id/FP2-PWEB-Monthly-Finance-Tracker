const month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const getMonth = () => {
  const thisMonth = new Date().getMonth();
  return month[thisMonth];
};

export const getNMonth = (n) => {
  if(n < 0) {
    const monthNum = 12 + n;
    return month[monthNum]
  } 

  const monthNum = n;
  return month[monthNum]
};
