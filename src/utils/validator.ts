const isPhone = str => /^1[3|4|5|7|8][0-9]{9}$/.test(str);
const isISBN = (str: any) => /^[0-9]{13}$/.test(str); // ISBN
export { isISBN, isPhone };
