// FIRST CLASS FUNCTIONS
// everything you can do with other types
// you can do with functions

// functions ARE objects.
// A function is a special type of object
// you can attach properties and methods to a function
// a function has two important properties
// 1. a name (not necessary - can be anonymous)
// 2. code (the code inside the function). this is invocable.

// add a property to a function.
// function greet() {
//   console.log('hi');
// }
//
// greet.language = 'english';
//
// console.log(greet.language);

// statements vs expression
// an expression is a unit of code that results
// in a value. it returns a value. E.g., '1 + 2'

// an if *statement* takes an expression as a parameter
// but is not an expression itself. A statement does work
// An expression results in a value.

// function statement:

// function greet() {
//   console.log('hi');
// }

// it doesn't return a value until the function
// is executed. It's a statement. Gets pulled into memory
// when the execution context is created.

// anonymous function expression:

// var anonymousGreet = function() {
//   console.log('hi');
// }

// the above creates an object on the fly and sets
// it equal to the variable. The function has no name
// it has a variable to know where it is in memory.
// this is an expression because it results in a value
// which is a function object.
// how do we run this code?

// anonymousGreet();

// IMPORTANT TO KNOW that anonymous functions set to variables
// are not hoisted. All variables are set to undefined
// before the code is executed. Therefore, you can't
// call anonymous functions before they are declared
// like you can with regular function statements.

// another interesting example:

// function log(a) {
//   a();
// }
//
// log(function() {
//   console.log('hi');
// });

// functions can be set as parameters to other functions!
// and can be called from within other functions.


// conceptual aside

// BY VALUE / BY REFERENCE

// By value:
// passing or referencing or setting equal one value
// to another by copying the value to a different spot
// in memory. This is passing by value.

// By reference:
// behaves differently - ALL OBJECTS INTERACT BY reference
// both point to the SAME MEMORY ADDRESS.

// by value (primitives)

//var a = 3;
//var b;
//
//b = a;

// a and b will be 3 - copies of each other sitting in
// two spots in memory. see below:

// a = 2;

// b is still equal to 3, but a is equal to 2 now.
// changing a has no impact on b because a copy was made

// by reference (all objects(including functions))

// var c = { greeting: 'hi' };
// var d;
//
// d = c;

// the equals operator points d to the same spot in memory
// as c. So if you then change c....

//c.greeting = 'hello';
//console.log(c);
//console.log(d);

// outputs hello for c AND d. They both point to the same
// location in memory, no matter what you change them to.
// so they will always be the same.

// objects are by reference even when passed as parameters

// function changeGreeting(obj) {
//   obj.greeting = 'Hola';
// }

// changeGreeting(d);
// console.log(c);
// console.log(d);

// obj will point to the same memory location as d, which
// already points to the same memory location as c.
// result is that greeting = hola for both.

// N O T E the equals operator sets up new memory space (new address);

// c = { greeting: 'howdy' };
// console.log(c);
// console.log(d);

// now, d and c are no longer pointing to the same space
// in memory. By reference doesn't apply bc the equals operator
// messes it up.

 // OBJECTS, FUNCTIONS, AND 'THIS'

 // review - when a function is invoked, a new execution
 // context is created and put on the execution stack.

 // think of the execution context focusing on the code portion
 // of the function object.

 // each execution context has a variable environment
 // and a reference to its outer lexical environment, which
 // tells it how to look down the scope chain. Every time an
 // execution context is created, we get the variable 'this'
 // which points at a different thing depending on
 // how the function is invoked. this can cause confusion.

 // How does JavaScript determines where 'this' points?

// console.log(this);

 // in the browser, 'this' points to the global object
 // which is the Window object.

//  function a() {
//    console.log(this);
//  }
//
// a();

// this still points to the global object.

// var b = function() {
//   console.log(this);
// }
//
// b();

// similarly, this points to the global object too.
// Even though there are 3 execution contexts here.
// 1. The global one, 2. when a is invoked, 3. when b
// is invoked. And they all get the 'this' keyword,
// which all point at the global object.

// when you're just invoking a function, 'this' points
// to the global variable.

// what about an object method?

// var c = {
//   name: 'The c object',
//   log: function() {
//     console.log(this);
//   }
// }
//
//
// c.log();

// NOW - 'this' points to the c object. In the case
// where a function is actually a method attached to
// an object, the 'this' keyword becomes a reference
// to the object it's sitting inside of.

// c.name = 'Updated c object';

// c.log();

// A lot of people think the following is a bug:

// `var c = {
// `  name: 'The c object',
// `  log: function() {
// `    this.name = 'updated c object';
// `    console.log(this);
// `
// `    var setname = function(newname) {
// `      this.name = newname;
// `    }
// `    setname('Updated again! The c object');
// `    console.log(this);
// `  }
// `}
// `
// `c.log();

// shouldn't the setname function change the name again?
// It doesn't actually work. It updates the name property
// on the global object instead. That internal function's
// 'this' variable points to the global object. Many
// people think it's wrong. But we can't change it!

// HOW CAN WE GET AROUND THIS??

// var c = {
//   name: 'The c object',
//   log: function() {
//     var self = this; // make a new variable.
//     self.name = 'updated c object';
//     console.log(self);
//
//     var setname = function(newname) {
//       self.name = newname;
//     }
//     setname('Updated again! The c object');
//     console.log(self);
//   }
// }
//
// c.log();

// Create a new variable 'self' that is equal to 'this'.
// Because we know objects are passed by reference, self will
// stay equal to where 'this' points at that time, which is
// to the c object. Then, just change 'this' to 'self' in every other
// point in your code. It's all about making a proper reference
// to your object, and then using that reference throughout.
// This pattern above is used quite often and is good practice.

// CONCEPTUAL ASIDE: Arrays

// Because JavaScript is dymanically typed, arrays
// can hold different types of items at once. See below.

// var arr = [
//   1,
//   false,
//   {
//     name: 'Joe',
//     address: '33rd St.'
//   },
//   function(name) {
//     var greeting = 'Hello ';
//     console.log(greeting + name);
//   },
//   "hello"
// ];
//
// console.log(arr);

// we can do cool stuff with this like the following:

// arr[3](arr[2].name);

// Moving on. 'arguments' and spread.

// 'arguments' hold all values to whatever function is called
// i.e., the arguments you pass.

// JavaScript gives a keyword of 'arguments' that contain all actual
// arguments passed to a function.

// function greet(firstname, lastname, language) {
//   console.log(firstname);
//   console.log(lastname);
//   console.log(language);
//   console.log('----------')
// }
//
// greet();

// this results in 'undefined' 3 times. Because of hoisting.
// It executes the greet function and sets up memory space
// for firstname, lastname, and language and sets them to
// undefined. If you pass actual arguments, they are processed
// left to right.

// greet('John');
// greet('John', 'Doe');
// greet('John', 'Doe', 'Spanish');

// JavaScript is cool with you not passing all parameters.

// you can set a default parameter like this

// language = language || 'en';

// if you try to console.log(arguments) inside the function
// it contains the values of the arguments you pass in an
// array-like format. It acts enough like an array that
// we can use it like one in most circumstances.

// function greet(firstname, lastname, language) {
//
//   language = language || 'english';
//
//   if (arguments.length === 0) {
//     console.log('Missing parameters!');
//     console.log('----------');
//     return;
//   }
//
//   console.log(firstname);
//   console.log(lastname);
//   console.log(language);
//   console.log('arg 0: ' + arguments[0]);
// }
//
// greet();
// greet('John');
// greet('John', 'Doe');
// greet('John', 'Doe', 'Spanish');

// note that as time goes on, 'arguments' will become deprecated.
// the new thing is the spread parameter. Which will be the preferred
// approach to dealing with stuff like this.



// framework aside
// function overloading(JavaScript doesn't have it).
// doesn't matter too much bc functions are first class.


// conceptual aside
// syntax parsers

// the code you write is translated by the JavaScript engine
// into something the computer can understand. A syntax
// parser is part of this.

// Imagine the syntax parser in the engine is going through code
// line by line with a set of rules to determine
// valid syntax, making assumptions, and even potentially making
// changes

// ** dangerous aside ** ooo spooky. A warning about a
// danger in JavaScript. So easy to make a mistake and
// so hard to track down so you need to avoid it.
// The automatic semicolon!

// Note that inserting semicolons is *optional*. The syntax
// parser will actually automatically insert semicolons where it
// expects them to be.

// But you should always put your own semicolons because you
// don't want the parser to make decisions for you. And in the case of
// `return` it can cause real problems.

// function getPerson() {
//   return
//   {
//     firstname: 'Joe'
//   }
// }
//
// console.log(getPerson());

// this returns 'undefined' because if JS sees a carriage
// return (hitting return on the keyboard) it inserts a
// semicolon and quits out of the function. How can we fix this?

// function getPerson() {
//   return {
//     firstname: 'Joe'
//   }
// }
//
// console.log(getPerson());

// try to always put curly braces on the same line
// as `return` and really almost everywhere else.
// It's good practice.

// framework aside
// w h i t e s p a c e

// Whitespace  - invisible characters that create literal
// space in your written code. E.g., carriage returns,
// tabs, spaces.

// JS's syntax parser is extremely liberal when it comes to
// what is allowed with whitespace.

// var
//
//   // first name of the person
//   firstname,
//
//   // last name of the person
//   lastname,
//
//   // the language
//   // can be 'en' or 'es'
//   language;
//
// var person = {
//   // the first name
//   firstname: 'Joe',
//
//   // the last name
//   // (always required)
//   lastname: 'Bobdog'
// }
//
// console.log(person);

// The above works! The syntax parser just ignores
// this whitespace. It's good to comment your code
// to make it readable and understandable in the future
// or for other people



// new topic: Immediately Invoked Function Expressions (IIFE)s

// We've already seen the difference between a function statement
// and a function expression.

// function statement:

// function greet(name) {
//   console.log('Hello ' + name);
// }
// greet('Joe');
// // using a function expression
//
// var greetFunc = function(name) {
//   console.log('Hello ' + name)
// }
// greet('Joe')
// kind of like a 'function literal'. A special thing we can
// do with all functions is to invoke the code property.
// We can actually invoke functions *on the fly*. See below:

// var greeting = function(name) {
//   return 'Hello ' + name;
// }('Dave');

// The above is an IIFE. The parentheses at the end invoke it
// immediately after it's created. Cool! Note that this function being
// invoked returns a string. So 'greeting' will be set equal to a string.

// What about standalone expressions and IIFEs?

// 3;
//
// "I am a string";

// These are valid. They don't do anything but
// nothing wrong with them. How about functions?

// function(name) {
//   return 'Hello ' + name;
// }

// The above does not work! The syntax parser expects a name
// for the function. It can't be anonymous. If you just put
// 'function' it's a function statement, not an expression.
// How do we trick the syntax parser into understanding that we dont
// intend these standalone functions to be statements but expressions?
// wrap the function in parens!

// (function(name) {
//   return 'Hello ' + name;
// });

// remember, parens are operators. You can only put expressions
// inside of them. I.e., something that returns a value.

// (function(name) {
//   var greeting = 'Hello';
//   console.log('Inside IIFE: ' + greeting + ' '  + name);
// })('Stephen Colbert');

// the above is also an IIFE and usually what we are talking about
// when we mention IIFEs. Wrap in paren to trick the syntax parser
// and include paren after to run it. You'll see the above style
// of code in pretty much every framework and library out there.

// WHY IS THIS USEFUL?

// framework aside
// IIFEs and safe code

// any variable declared inside an IIFE sits alone in its
// own execution context. Does not touch the global execution context.
// By wrapping code in an IIFE you can be sure that your code does not
// interfere with other code that might be included in an application.
// in a great deal of libraries and functions the very first thing in the source
// code is a parentheses and a function. All code wrapped in an IIFE.


// UNDERSTANDING CLOSURES

// vital but difficult to understand. Check the example below.


// function greet(whattosay) {
//   return function(name) {
//     console.log(whattosay + ' ' + name);
//   }
// }
// greet('Hi')('Tony');

// this is so interesting. Look at it another way:

// function greet(whattosay) {
//   return function(name) {
//     console.log(whattosay + ' ' + name);
//   }
// }
//
// var sayHi = greet('Hi');
// sayHi('Joe');

// How does the sayHi function know the whattosay variable?
// The greet function is done, it's popped off the execution stack!
// And yet - sayHi has the proper value of what to say.
// How is it possible? Because of closures.

// After the greet execution context is popped off the stack,
// and under normal circumstances the JS garbage collector clears out the
// memory space for its variables. When sayHi is invoked, a new execution context
// is created and javascript goes up the scope chain to look for the
// whattosay variable. Even though the execution context for greet()
// was popped off the stack, the sayHi execution context still has
// a reference to its memory space. We say that the execution context
// has 'closed in' its outer variables.

// This phenomenon of 'closing in' of all the variables an execution
// context should have access to is called Closures. JS does this
// automatically. Any function will have access to the outer variables it's
// supposed to have access to. This is a very powerful feature.

// Understanding closures part 2:

// function buildFunctions() {
//   var arr = [];
//   for (var i = 0; i < 3; i++) {
//     arr.push(
//       function() {
//         console.log(i);
//       }
//     )
//   }
//   return arr;
// }
//
// var fs = buildFunctions();
//
// fs[0]();
// fs[1]();
// fs[2]();

// This finds 3s in all cases...why??? Because of closures! Each of the
// three functions has the same outer environment reference
// where i is equal to 3! So they're all 3. They were all created
// inside the same function. They all have the same parent.
// it's like asking 3 brothers how old their dad is. The answer
// is the same for each. The console.log is executed not where
// it's sitting but when the fs functions are executed.

// If you want it to be what you might think it might have been originally, use IIFE:

// function buildFunctions() {
//   var arr = [];
//   for (var i = 0; i < 3; i++) {
//     arr.push(
//       (function(j) {
//         return function() {
//           console.log(j);
//         }
//       }(i))
//     )
//   }
//   return arr;
// }
//
// var fs = buildFunctions();
//
// fs[0](); // returns 0
// fs[1](); // returns 1
// fs[2](); // returns 2

// framework aside
// How can we use closures to our advantage? Function factories.

// function makeGreeting(language) {
//   return function(firstname, lastname) {
//     if (language === 'en') {
//       console.log('Hello ' + firstname + ' ' + lastname);
//     }
//     if (language === 'es') {
//       console.log('Hola ' + firstname + ' ' + lastname);
//     }
//   }
// }
//
//
// var greetEnglish = makeGreeting('en'); // note that every time a function is called
//                                        // a new execution context is created - even
//                                        // if you call the same function more than once
// var greetSpanish = makeGreeting('es');
//
// greetEnglish('John', 'Doe');
// greetSpanish('Juan', 'Tequila');

// the makeGreeting function has acted as a factory function.
// we can take advantage of closures to essentially set the parameter
// value that is then used inside of the function that is returned.
// this is pretty neat stuff.

// closures and callbacks.

// function sayHiLater() {
//   var greeting = 'Hi';
//
//   setTimeout(function() {
//     console.log(greeting);
//   }, 3000);
// }
//
// sayHiLater();

// this uses a closure! and first-class functions and function expressions! woo!

// jquery click events also use function expressions and first-class functions!

// big word alert - callback function:
// a function you give to another function to be run when the other
// function is finished. So the function you call (i.e., invoke),
// 'calls back' by calling the function you gave when it finishes.
// Example below:

// function tellMeWhenDone(callback) {
//   var a = 1000; // doing some work
//   var b = 2000; // doing some work
//
//   callback();
// }
// tellMeWhenDone(function() {
//   console.log('I am done!');
// });
//
// tellMeWhenDone(function() {
//   console.log('I am done!!!!!!');
//
// });

// call(), apply(), and bind();
// these 3 functions have to do with something we've already
// discussed - the 'this' variable.
// we already know a function is a special type of object with
// name and code variables. And all functions get access to special
// methods - call(), apply(), and bind(). And all three have to do
// with the 'this' variable and the arguments you pass to the function.

// var person = {
//   firstname: 'John',
//   lastname: 'Davis',
//   getFullName: function() {
//     var fullname = this.firstname + ' '
//     + this.lastname;
//     return fullname;
//   }
// }
//
// var logName = function(lang1, lang2) {
//   console.log('Logged: ' + this.getFullName());
// }

// if you tried to execute the above logName(), it would fail
// because 'this' is set to the global execution conext in this function.
// wouldn't it be nice if we could control what 'this' is set to?

// var person = {
//   firstname: 'John',
//   lastname: 'Davis',
//   getFullName: function() {
//     var fullname = this.firstname + ' '
//     + this.lastname;
//     return fullname;
//   }
// }
//
// var logName = function(lang1, lang2) {
//   console.log('Logged: ' + this.getFullName());
// }

// the bind method makes a copy of the logName function and sets
// up this new copy so that it changes the 'this' variable to
// whatever is set as the argument to bind();

// var logPersonName = logName.bind(person);

// logPersonName();

// this works!!

// logName.call(person);

// the call() function works similarly but then just calls the function
// at the same time! Very convenient. You can also pass additional parameters
// to the function.

// logName.apply(person);

// the apply() function does the same thing as call() because the apply
// method wants an array of parameters after 'person'. That's the only difference.

// When would you ever use this? Example: function borrowing.

// var person2 = {
//   firstname: 'Jane',
//   lastname: 'Diamond'
// }
//
// console.log(person.getFullName.apply(person2));

// holy fucking shit!!!!

// you can grab methods from other objects and use them as long as you have
// similar property names

// another example - function currying.

// function multiply(a, b) {
//   return a*b;
// }
//
// var multipleByTwo = multiply.bind(this, 2);

// giving multipleByTwo parameters sets the permanent values of
// these parameters when the copy is made with bind();
// so the first parameter will ALWAYS be a 2.

// console.log(multipleByTwo(22));
// outputs 44.

// D A M N

// function currying: creating a copy of a function but with some
// preset parameters. Very useful in mathematical situations.

// FUNCTIONAL PROGRAMMING!!!!!!!
// introduces an entirely new way of thinking when programming
// you can't do it without first-class functions.

// the traditional way to do it:

// var arr1 = [1, 2, 3];
// console.log(arr1);
// 
// var arr2 = [];
// for (var i = 0; i < arr1.length; i++) {
//   arr2.push(arr1[i] * 2);
// }

// console.log(arr2);

// this is a lot of code! Look at this:

function mapForEach(arr, fn) {
  var newArr = [];
  for (var i = 0; i < arr1.length; i++) {
    newArr.push(
      fn(arr[i])
    )
  };
  return newArr;
}

var arr2 = mapForEach(arr1, function(item) {
  return item * 2;
})

console.log(arr2);

var arr3 = mapForEach(arr1, function(item) {
  return item > 2;
})

console.log(arr3);

// this is functional programming in action - using
// first-class functions to segment code in clean and useful
// ways.
