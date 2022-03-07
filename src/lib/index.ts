const arr = [1, 3, 2, 4, 5];
new Promise<number>((resolve) => {
  resolve(0);
})
  .then((res) => {
    console.log(arr[res]);
    return 1;
  })
  .then((res) => {
    console.log(arr[res]);
    return 2;
  })
  .then((res) => {
    console.log(arr[res]);
    return 3;
  })
  .then((res) => {
    console.log(arr[res]);
    return 4;
  })
  .then((res) => {
    console.log(arr[res]);
  })
  .finally(() => {
    console.log('123');
  });
