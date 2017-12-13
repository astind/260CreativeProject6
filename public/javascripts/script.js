var myApp = angular.module("myApp",["firebase"]);

myApp.controller("gameController", ["$scope", "$firebaseArray", "$firebaseAuth","$firebaseObject",
 function($scope, $firebaseArray, $firebaseAuth, $firebaseObject) {

   var auth = $firebaseAuth();
   var user = '';
   $scope.loggedIn = false;
   $scope.displayName = '';
   $scope.playerButton = false;
   $scope.monsterButton = false;
   $scope.questButton = false;

   $scope.signIn = function() {
     console.log("in signIn");
     auth.$signInWithPopup("github").then(function(firebaseUser) {
       user = firebaseUser.user.uid;
       console.log("User uuid:  ", user);
       console.log("Signed in as: "+ firebaseUser.user.displayName);
       $scope.loggedIn = true;
       $scope.displayName = firebaseUser.user.displayName;
       var ref = firebase.database().ref().child("games").child(user);

       $scope.data = $firebaseObject(ref.child("data"));
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
        $scope.loggedIn = false;
     }).catch(function(error) {
	console.log("Signing out failed: ", error);
     });
   };
   
   $scope.upPartyPoints = function() {
     $scope.data.lifepoints += 1;
     $scope.data.$save().then(function() {
	console.log("saved up life points");
     });
   };

   $scope.downPartyPoints = function() {
     $scope.data.lifepoints -= 1;
     $scope.data.$save().then(function() {
        console.log("saved down life points");
     });
   };

   $scope.setQuest = function(quest) {
     $scope.data.quest = quest.currentquest;
     $scope.data.lifepoints = quest.lifepoints;
     $scope.data.$save().then(function() {
       console.log("quest saved: ");
       $scope.questButton = false;
     });
   };

   $scope.displayQuest = function() {
     $scope.questButton = true;
   };

   $scope.displayAddPlayer = function() {
     $scope.playerButton = true;
   };

   $scope.displayAddMonster = function() {
     $scope.monsterButton = true;
   };

   $scope.upLifePlayer = function(player) {
     var key = $scope.players.$keyAt(player);
     var obj = $scope.players.$getRecord(key);
     console.log(obj);
     obj.health = obj.health + 1;
     $scope.players.$save(obj).then(function() {
        console.log("saved upLife Player to database");
     });
   };

   $scope.downLifePlayer = function(player) {
     var key = $scope.players.$keyAt(player);
     var obj = $scope.players.$getRecord(key);
     console.log(obj);
     obj.health = obj.health - 1;
     $scope.players.$save(obj).then(function() {
        console.log("saved downLife Player to database");
     });
   };

   $scope.upFatigue = function(player) {
     var key = $scope.players.$keyAt(player);
     var obj = $scope.players.$getRecord(key);
     console.log(obj);
     obj.fatigue = obj.fatigue + 1;
     $scope.players.$save(obj).then(function() {
        console.log("saved upFatigue to database");
     });
   };

   $scope.downFatigue = function(player) {
     var key = $scope.players.$keyAt(player);
     var obj = $scope.players.$getRecord(key);
     console.log(obj);
     obj.fatigue = obj.fatigue - 1;
     $scope.players.$save(obj).then(function() {
        console.log("saved downFatigue to database");
     });
   };

   $scope.useFeat = function(player) {
     var key = $scope.players.$keyAt(player);
     var obj = $scope.players.$getRecord(key);
     console.log(obj);
     obj.featUsed = true;
     $scope.players.$save(obj).then(function() {
        console.log("saved useFeat to database");
     });
   };

   $scope.gainFeat = function(player) {
     var key = $scope.players.$keyAt(player);
     var obj = $scope.players.$getRecord(key);
     console.log(obj);
     obj.featUsed = false;
     $scope.players.$save(obj).then(function() {
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
     $scope.playerButton = false;
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
     $scope.monsterButton = false;
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
