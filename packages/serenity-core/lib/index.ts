type ThisIsAnTest<T> = T | null | undefined;

const bruh: ThisIsAnTest<string> = 'a';
const abc: ThisIsAnTest<string> = null;

console.log(bruh);
console.log(abc);