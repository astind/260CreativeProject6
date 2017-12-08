var myApp = angular.module("myApp",["firebase"]);

myApp.controller("gameController", ["$scope", "$firebaseArray", "$firebaseAuth",
 function($scope, $firebaseArray, $firebaseAuth) {

   var auth = $firebaseAuth();

   $scope.signIn = function() {
     console.log("in signIn");
     auth.$signInWithPopup("github").then(function(firebaseUser) {
       console.log("signed in as:", firebaseUser.user.uid);
     }).catch(function(error) {
       console.log("auth failed:", error);
     });
   };

   $scope.test = function(){
      console.log("TEST FUNCTION");
   };

   var ref = firebase.database().ref().child("messages");
   $scope.chats = $firebaseArray(ref);
   $scope.update = function(user) {
       var newmessage = {from:user.name || "anonymous",body:user.chat};
       console.log(newmessage);
       $scope.chats.$add(newmessage);
       user.chat = "";
   }
 }
]);
