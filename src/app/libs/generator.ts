export type TLetterCase = "lowercase" | "uppercase" | "random";

const LETTERS = "abcdefghijklmnopqrstuvwxyz";
const NUMBERS = "0123456789";

export const generateRandomString = (
   length: number,
   letterCase: TLetterCase,
   includeNumbers: boolean,
): string => {
   let chars = LETTERS;

   if (includeNumbers) {
      chars += NUMBERS;
   }

   const random = new Uint32Array(length);

   crypto.getRandomValues(random);

   return Array.from(random, (value) => {
      let char = chars[value % chars.length];

      if (/[a-z]/.test(char)) {
         switch (letterCase) {
            case "lowercase":
               char = char.toLowerCase();
               break;
            case "uppercase":
               char = char.toUpperCase();
               break;
            case "random":
               char = value % 2 === 0 ? char.toLowerCase() : char.toUpperCase();
               break;
         }
      }

      return char;
   }).join("");
};
