var myApp = angular.module("myApp",["firebase"]);

myApp.controller("gameController", ["$scope", "$firebaseArray", "$firebaseAuth",
 function($scope, $firebaseArray, $firebaseAuth) {

   var auth = $firebaseAuth();
   var user = '';
   var userStatus = "Not Signed In";

   $scope.signIn = function() {
     console.log("in signIn");
     auth.$signInWithPopup("github").then(function(firebaseUser) {
       console.log(firebaseUser.user);
       user = firebaseUser.user.uid;
       console.log("signed in as: ", user);
       userStatus = "Signed in as: "+ firebaseUser.user.displayName;
       console.log(userStatus);

       var ref = firebase.database().ref().child("games").child(user);

       $scope.data = $firebaseArray(ref.child("data"));
       $scope.players = $firebaseArray(ref.child("players"));
       $scope.monsters = $firebaseArray(ref.child("monsters"));

     }).catch(function(error) {
       console.log("auth failed:", error);
     });
   };

   $scope.signOut = function() {
     console.log("in signout");
     auth.$signOut().then(function() {
	console.log("Sign Out Successful");
        userStatus = "Signed out";
        user = '';

     }).catch(function(error) {
	console.log("Signing out failed: ", error);
     });
   };

   $scope.upLifePlayer = function(player) {
     var key = $scope.players.$keyAt(player);
     var obj = $scope.players.$getRecord(key);
     console.log(obj);
     obj.health = obj.health + 1;
     $scope.palyers.$save(obj).then(function() {
        console.log("saved upLife Player to database");
     });
   };

   $scope.downLifePlayer = function(player) {
     var key = $scope.players.$keyAt(player);
     var obj = $scope.players.$getRecord(key);
     console.log(obj);
     obj.health = obj.health - 1;
     $scope.palyers.$save(obj).then(function() {
        console.log("saved downLife Player to database");
     });
   };

   $scope.upFatigue = function(player) {
     var key = $scope.players.$keyAt(player);
     var obj = $scope.players.$getRecord(key);
     console.log(obj);
     obj.fatigue = obj.fatigue + 1;
     $scope.palyers.$save(obj).then(function() {
        console.log("saved upFatigue to database");
     });
   };

   $scope.downFatigue = function(player) {
     var key = $scope.players.$keyAt(player);
     var obj = $scope.players.$getRecord(key);
     console.log(obj);
     obj.fatigue = obj.fatigue - 1;
     $scope.palyers.$save(obj).then(function() {
        console.log("saved downFatigue to database");
     });
   };

   $scope.useFeat = function(player) {
     var key = $scope.players.$keyAt(player);
     var obj = $scope.players.$getRecord(key);
     console.log(obj);
     obj.featUsed = true;
     $scope.palyers.$save(obj).then(function() {
        console.log("saved useFeat to database");
     });
   };

   $scope.gainFeat = function(player) {
     var key = $scope.players.$keyAt(player);
     var obj = $scope.players.$getRecord(key);
     console.log(obj);
     obj.featUsed = false;
     $scope.palyers.$save(obj).then(function() {
        console.log("saved gainFeat to database");
     });
   };

   $scope.addPlayer = function(player) {
     console.log("add player");
     var newplayer = {
	name: player.name,
	image: player.image,
	health: player.health,
	fatigue: player.fatigue,
	strength: player.strength,
        intelligence: player.intelligence,
        willpower: player.willpower,
	awareness: player.awareness,
	featUsed: false
     };
     console.log(newplayer);
     $scope.players.$add(newplayer);
   };

   $scope.removePlayer = function(player) {
     console.log("removePlayer");
     $scope.players.$remove(player);
   };

   $scope.addMonster = function(monster) {
     console.log("add monster");
     var newMonster = {
	name: monster.name,
	image: monster.image,
	health: monster.health
     };
     console.log(newMonster);
     $scope.monsters.$add(newMonster);
     $scope.monster.name ='';
     $scope.monster.image = '';
     $scope.monster.health = '';
   };

   $scope.removeMonster = function(monster) {
     console.log("remove monster");
     $scope.monsters.$remove(monster);
   };

   $scope.upLifeMonster = function(monster) {
     var key = $scope.monsters.$keyAt(monster);
     var obj = $scope.monsters.$getRecord(key);
     console.log(obj);
     obj.health = obj.health + 1;
     $scope.monsters.$save(obj).then(function() {
	console.log("saved upLife Monster to database");
     });
   };

   $scope.downLifeMonster = function(monster) {
     var key = $scope.monsters.$keyAt(monster);
     var obj = $scope.monsters.$getRecord(key);
     console.log(obj);
     obj.health = obj.health - 1;
     $scope.monsters.$save(obj).then(function() {
        console.log("saved downLife Monster to database");
     });
   };

 }
]);
