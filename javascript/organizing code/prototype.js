// All objects in JavaScript have a prototype. Stated simply, the prototype is another object that the original object inherits from, which is to say, the original object has access to all of its prototype’s methods and properties.

// If you’re using constructors to make your objects it is best to define functions on the prototype of that object. Doing so means that a single instance of each function will be shared between all of the Student objects. If we declare the function directly in the constructor, like we did when they were first introduced, that function would be duplicated every time a new Student is created. In this example, that wouldn’t really matter much, but in a project that is creating thousands of objects, it really can make a difference.

function Student(name, grade) {
  this.name = name;
  this.grade = grade;
}

Student.prototype.sayName = function () {
  console.log(this.name);
};

Student.prototype.goToProm = function () {
  console.log("Eh.. go to prom?");
};

const student1 = new Student("John", 10);
student1.sayName();

/// /////////////////////////////////////////////// ///
// Recommended Method for Prototypal Inheritance

// So far you have seen several ways of making an object inherit the prototype from another object. At this point in history, the recommended way of setting the prototype of an object is Object.create. Object.create very simply returns a new object with the specified prototype and any additional properties you want to add. For our purposes, you use it like so:

function Student2() {}

Student2.prototype.sayName = function () {
  console.log(this.name);
};

function EighthGrader(name) {
  this.name = name;
  this.grade = 8;
}

EighthGrader.prototype = Object.create(Student2.prototype);

const carl = new EighthGrader("carl");
carl.sayName(); // console.logs "carl"
console.log(carl.grade); // 8

// A warning… this doesn’t work:
// EighthGrader.prototype = Student.prototype
// because it will literally set EighthGrader’s prototype to Student.prototype (i.e. not a copy), which could cause problems if you want to edit something in the future.
