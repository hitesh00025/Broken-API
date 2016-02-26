var express = require('express');
var _ = require('lodash');
var router = express.Router();

function Person(body) {
  this.name = body.name;
  this.pets = body.pets;
  this.apples = 12;
}

Person.prototype.greet = function() {
  this.greeting = this.name = 'Hi ' + this.name + ', how are you?';
  return this.greeting;
};

Person.prototype.howManyApples = function(first_argument) {
  return this.name + ' has ' + this.apples + ' apples';
};

Person.prototype.greetPet = function(pet) {
  return 'Hi ' + pet + ', YOU\'RE JUST SO FLUFFY! :O ';
};

Person.prototype.greetPets = function(first_argument) {

  self = this;
  this.petGreeting = [];
  if (typeof this.pets === 'object') {
    this.pets.forEach(function(pet) {
      self.petGreeting.push(self.greetPet(pet));
    });
  } else {

    self.petGreeting.push(self.greetPet(pet));
  }
  return this.petGreeting.join();
};

router.get('/', function(req, res, next) {


  if (_.isEmpty(req.body)) {
    req.body = {
      "name": "hitest",
      "pets": ['scooby', 'do']
    }
  }

  var body = req.body;

  var _person = new Person(req.body);
  res.json({
    greeting: _person.greet(),
    apples: _person.howManyApples(),
    greetPets: _person.greetPets()

  });
  res.end();
});

module.exports = router;
