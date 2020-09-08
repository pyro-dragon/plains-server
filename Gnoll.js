const Gender = require("./genders.enum");

class Gnoll {

    type = "person";
    name = "";
    male = Gender.male;
    vehicle = "";
    age = null;
    clanId = "";
    race = "gnoll";

    constructor(name, gender, age){
        this.name = name;
        this.male = gender;
        this.age = age;
    }
}

module.exports = Gnoll;