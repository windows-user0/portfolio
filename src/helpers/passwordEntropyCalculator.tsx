interface PasswordStrenghtCalculator {
  password: string;
}

export default function passwordCalculator(password: string) {
  return new PasswordStrenghtCalculator(password);
}
class PasswordStrenghtCalculator {
  constructor(password: string) {
    this.password = password;
  }

  private get lenght() {
    return this.password.length;
  }
  private get splitPassword() {
    return this.password.split("");
  }

  get entropy() {
    const firstLetter = this.splitPassword[0];
    const lastLetter = this.splitPassword[this.lenght - 1];
    const additionalCombinationsFirstLetter = this.getSpecialCombinationsForLetter(
      firstLetter
    );
    const additionalCombinationsLastLetter = this.getSpecialCombinationsForLetter(
      lastLetter
    );

    let possibleSymbols = 0;
    const {
      special,
      uppercase,
      numbers,
      lowercase,
    } = this.numberOfValidChars();
    if (numbers) possibleSymbols += 10;
    if (lowercase) possibleSymbols += 26;
    if (uppercase) possibleSymbols += 26;
    if (special) possibleSymbols += 33;

    if (this.lenght === 0) return 0;
    if (this.lenght === 1) {
      return Math.log2(26 + additionalCombinationsFirstLetter);
    }
    if (this.lenght === 2) {
      return Math.log2(
        (26 + additionalCombinationsFirstLetter) *
          (26 + additionalCombinationsLastLetter)
      );
    }

    return Math.log2(
      (26 + additionalCombinationsFirstLetter) *
        possibleSymbols ** Math.max(this.lenght - 2, 0) *
        (26 + additionalCombinationsLastLetter)
    );
  }

  private numberOfValidChars() {
    let numbersInPassword = 0;
    // 26 lowercase
    let lowercaseLettersInPassword = 0;
    // 26 uppercase
    let uppercaseLettersInPassword = 0;
    // 33 special char
    let specialCharsInPassword = 0;

    const password = this.splitPassword.splice(1, this.lenght - 2);

    password.forEach((letter: string) => {
      if (this.checkTypeOfChar(letter) === "number") {
        numbersInPassword++;
      } else if (this.checkTypeOfChar(letter) === "upppercase") {
        uppercaseLettersInPassword++;
      } else if (this.checkTypeOfChar(letter) === "special") {
        specialCharsInPassword++;
      } else lowercaseLettersInPassword++;
    });
    return {
      special: specialCharsInPassword,
      lowercase: lowercaseLettersInPassword,
      uppercase: uppercaseLettersInPassword,
      numbers: numbersInPassword,
    };
  }
  get text() {
    if (this.entropy < 28) return "Very Weak";
    if (this.entropy < 35) return "Weak";
    if (this.entropy < 59) return "Reasonable";
    if (this.entropy < 128) return "Strong";
    if (this.entropy >= 128) return "Very strong";
  }

  private getSpecialCombinationsForLetter(letter: string): number {
    switch (this.checkTypeOfChar(letter)) {
      case "number":
        return 10;
      case "uppercase":
        return 26;
      case "special":
        return 33;
      default:
        return 0;
    }
  }
  private checkTypeOfChar(char: any): string {
    if (isNaN(char) === false) return "number";
    if (this.isUppercaseLeterCheck(char)) return "uppercase";
    if (this.isLowercaseLetterCheck(char)) return "lowercase";
    // Its different so its a special ch ar
    return "special";
  }

  private isLowercaseLetterCheck(string: string) {
    const regex = new RegExp(/[a-z]/);
    return regex.test(string);
  }
  private isUppercaseLeterCheck(string: string) {
    const regex = new RegExp(/[A-Z]/);
    return regex.test(string);
  }
}
