# PasswordGen
A simple class for cryptographically strong secure password generation

---

## Installation
This is available as a package on npm so you can add this to your project by using npm or yarn

**npm**
```bash
npm install z-password-gen --save-dev --production
```

**yarn**
```bash
yarn add z-password-gen --dev
```

## Usage
In your main JavaScript file, import the class and then generate the new password

```javascript
import PasswordGen from 'z-password-gen';

let generator = new PasswordGen();

// Set the length of the password, default is 32
generator.setLength(32);

// Set the keyspace - i.e. the characters to choose from
generator.setKeyspace('abcdefghijklmnopqrstuvwxyz');

// Generate the keyspace dynamically, default is luns
// each character in the string passed in denotes one of the character groups
// to choose from, see the "Character Groups" section
generator.generateKeyspace('luns');

// These methods are also chainable
generator.setLength(32).generateKeyspace('lunsw');

// A new password will be generated each time the password property is gotten
// so store this inside a variable if you want to reuse it
console.log(generator.password);
```

---

## Character Groups
Below are the character groups used in the `generateKeyspace` method

| Group               | Variable                     | Letter |
|---------------------|------------------------------|--------|
| lowercase_letters   | 'abcdefghijklmnopqrstuvwxyz' | l      |
| uppercase_letters   | 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' | u      |
| numbers             | '1234567890'                 | n      |
| special_characters  | '!@#$%&*?,./\|[]{}()'        | s      |
| whitespace          | ' '                          | w      |

---

## Building
If for some reason, you want to build the files for this library yourself (instead of using the `dist` folder), you can run the following commands to work locally with it

*Note: Don't forget to install the dev dependencies*

**Running `gulp`
```bash
gulp # This command builds the files, then watches for any changes in the src directory
gulp build # This command only builds the files
gulp watch # This command only watches the files
```
