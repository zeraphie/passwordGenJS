/*==============================================================================
 Password generator class
 
 This is a javascript version of my PasswordGen PHP library accessible here:
 https://github.com/zeraphie/passwordGen
 
 This does not rely on any outside libraries apart from the window.crypto
 object, and has browser support for at least IE11+
 =============================================================================*/
export default class PasswordGen {
    /**
     * Create a new PasswordGen instance and setting the default character
     * groups to be used by this class
     */
    constructor(){
        /*--------------------------------------
         Setup of the length and keyspace
         variables
         --------------------------------------*/
        this.length = this.constructor.default_length;
        this.keyspace = '';
        
        /*--------------------------------------
         Setup the keyspace
         --------------------------------------*/
        this.generateKeyspace();
    }
    
    /**
     * Getter for minimum_length class variable for the minimum length of
     * the password generated
     *
     * @return number                           The minimum password length
     */
    static get minimum_length(){
        return 8;
    }
    
    /**
     * Getter for maximum_random_integer class variable for the maximum limit of
     * random integer
     *
     * @return number                           The maximum random integer
     */
    static get maximum_random_integer(){
        return 256;
    }
    
    /**
     * Getter for default_length class variable used to generate the default
     * password length
     *
     * @return number                           The default password length
     */
    static get default_length(){
        return 16;
    }
    
    /**
     * Getter for default_sets class variable used to generate the keyspace
     *
     * @return string                           The default sets
     */
    static get default_sets(){
        return 'luns';
    }
    
    /**
     * Getter for lowercase_letters set used in generating the keyspace
     *
     * @return string                           All lower case letters
     */
    static get lowercase_letters(){
        return 'abcdefghijklmnopqrstuvwxyz';
    }
    
    /**
     * Getter for uppercase_letters set used in generating the keyspace
     *
     * @return string                           All upper case letters
     */
    static get uppercase_letters(){
        return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    }
    
    /**
     * Getter for numbers set used in generating the keyspace
     *
     * @return string                           All single digits
     */
    static get numbers(){
        return '1234567890';
    }
    
    /**
     * Getter for special_characters set used in generating the keyspace
     *
     * @return string                           All special characters used
     */
    static get special_characters(){
        return '!@#$%&*?,./|[]{}()';
    }
    
    /**
     * Getter for whitespace set used in generating the keyspace
     *
     * @return string                           All whitespace characters used
     */
    static get whitespace(){
        return ' ';
    }
    
    /**
     * Getter for whitespace set used in generating the keyspace
     *
     * @return string                           All whitespace characters used
     */
    static get character_sets(){
        return {
            'l': this.lowercase_letters,
            'u': this.uppercase_letters,
            'n': this.numbers,
            's': this.special_characters,
            'w': this.whitespace
        };
    }
    
    /**
     * Test if any elements of an array exist as keys in another array
     *
     * @param  needles          array           The needles to search for
     * @param  haystack         array           The haystack to search
     * @return boolean                          Whether any needles exist as
     *                                          array keys in the haystack
     */
    static arrayKeySearch(needles, haystack){
        let i = 0, length = needles.length;
        
        while(i < length){
            for(let item in haystack){
                if(needles[i] === item){
                    return true;
                }
            }
            
            i++;
        }
        
        return false;
    }
    
    /**
     * Generate a cryptographically strong random number between two values
     *
     * @param  min              number          The minimum number
     * @param  max              number          The maximum number
     * @return integer
     */
    static randomInteger(min, max){
        try {
            if(max < this.maximum_random_integer){
                let crypto = window.crypto || window.msCrypto;
                let byteArray = new Uint8Array(1);
                crypto.getRandomValues(byteArray);
                
                let range = max - min + 1;
                
                if(
                    byteArray[0]
                        >=
                    Math.floor(this.maximum_random_integer / range) * range
                ){
                    return this.randomInteger(min, max);
                }
                
                return min + (byteArray[0] % range);
            } else {
                throw `Sorry the maximum is too large\n` +
                `The maximum size is ${this.maximum_random_integer}\n`;
            }
        } catch(e) {
            console.log(e);
        }
    }
    
    /**
     * Return an error message if a variable is too long
     *
     * @param  variable         string          The variable that's too long
     * @return string                           The error message
     */
    errorTooLong(variable){
        return `Sorry the ${variable} is too long\n` +
            `The maximum length is ${this.constructor.maximum_random_integer} characters\n` +
            `The default ${variable} is currently being used`;
    }
    
    /**
     * Set the length of the password, checking if it's an integer and
     * higher than the minimum required length
     *
     * @param  value            integer     Length of the generated password
     * @return PasswordGen      this        The current instance of PasswordGen
     */
    setLength(value = 0){
        if(
            value === parseInt(value)
                &&
            value >= this.constructor.minimum_length
        ){
            this.length = value;
        }
        
        return this;
    }
    
    /**
     * Set the keyspace of the password generator, checking if it's set and not
     * an empty string
     *
     * @param  keyspace         string      Sets to be used for generator
     * @return PasswordGen      this        The current instance of PasswordGen
     */
    setKeyspace(keyspace = ''){
        if(typeof keyspace === 'string' && keyspace !== ''){
            if(keyspace.length < this.constructor.maximum_random_integer){
                this.keyspace = keyspace;
            } else {
                console.log(this.errorTooLong('keyspace'));
            }
        }
        
        return this;
    }
    
    /**
     * Generate the keyspace of the password generator using the character
     * groups
     *
     * @param  sets             string      Sets to be used for generator
     * @return PasswordGen      this        The current instance of PasswordGen
     */
    generateKeyspace(sets = this.constructor.default_sets){
        this.keyspace = '';
        
        /*--------------------------------------
         Test if the sets variable is a string
         and if any of the characters in it
         are in the character_sets array's keys
         --------------------------------------*/
        if(
            typeof sets === 'string'
                &&
            this.constructor.arrayKeySearch(
                sets, this.constructor.character_sets
            )
        ){
            /*--------------------------------------
             Split the sets string on every
             character and loop through them
             --------------------------------------*/
            for(let set in sets.split('')){
                this.keyspace += this.constructor.character_sets[
                    sets[set]
                ];
            }
        } else {
            for(let set in this.constructor.default_sets.split('')){
                this.keyspace += this.constructor.character_sets[
                    this.constructor.default_sets[set]
                ];
            }
        }
        
        if(this.keyspace.length > this.constructor.maximum_random_integer){
            console.log(this.errorTooLong('keyspace'));
            this.generateKeyspace();
        }
        
        return this;
    }
    
    /**
     * Generate the password by selecting a random character from
     * the keyspace generated
     *
     * @return string           password    The generated password
     */
    generatePassword(){
        let password = '';
        
        for(let i = 0; i < this.length; i++){
            password += this.keyspace.split('')[
                this.constructor.randomInteger(0, this.keyspace.length - 1)
            ];
        }
        
        return password;
    }
    
    /**
     * Getter for password
     *
     * @return string                       The generated password
     */
    get password(){
        return this.generatePassword();
    }
}
