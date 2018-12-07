// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by autoform-multiple-file-upload.js.
import { name as packageName } from "meteor/perfectsofttunisia:autoform-multiple-file-upload";

// Write your tests here!
// Here is an example.
Tinytest.add('autoform-multiple-file-upload - example', function (test) {
  test.equal(packageName, "autoform-multiple-file-upload");
});
