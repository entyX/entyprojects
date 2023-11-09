// variables
var randombiome = 0;
var randomNum = 0;
var ranInt = 0;
var seconds = 1;
var Htimer = 10;
var Ftimer = 3;
var hWarning = 0;
var float = 0;

// music
var surface = new Audio('surface.mp3');
var click = new Audio('click.wav');
var fail = new Audio('fail.mp3');
surface.volume = 0.5;
click.volume = 1;
fail.volume = 1;

// function show variables
function showVar() {
  document.getElementById("land").innerText = "Land (acres): "+localStorage.land;
  document.getElementById("cland").innerText = "Cleared Land (acres): "+localStorage.cland;
  document.getElementById("gold").innerText = "Gold: "+Math.floor(localStorage.gold);
  document.getElementById("toolkit").innerText = "Toolkit: "+localStorage.toolkit;
  document.getElementById("settlement").value = localStorage.settlement;
  document.getElementById("wood").innerText = "Wood: "+localStorage.wood;
  document.getElementById("stone").innerText = "Stone: "+localStorage.stone;
  document.getElementById("iron").innerText = "Iron: "+localStorage.iron;
  document.getElementById("house").innerText = "Houses: "+localStorage.house;
  document.getElementById("people").innerText = "People: "+Math.floor(localStorage.people);
  document.getElementById("food").innerText = "Food: "+Math.floor(localStorage.food);
  document.getElementById("farm").innerText = "Farms: "+localStorage.farm;
}

// show variables at start
showVar();

        function buyLand() {
            if (localStorage.land) {
              if (localStorage.gold >= 50) {
                localStorage.land = Number(localStorage.land)+1;
                localStorage.gold = Number(localStorage.gold)-50;
                document.getElementById("news").innerText = "You conquered land and spent 50 gold on the border!";
                click.play();
                }
                else {
                document.getElementById("news").innerText = "You realized you didn't have enough gold...";
                fail.play();
              }
            } else {
              localStorage.land = 1;
            }
            document.getElementById("land").innerText = "Land (acres): "+localStorage.land;
            document.getElementById("gold").innerText = "Gold: "+Math.floor(localStorage.gold); 
        }

        function rndInt(min, max) {
          Math.floor(Math.random() * (max - min)) + min;
        }


        function clearLand() {
            if (localStorage.cland) {
                if (localStorage.land > 0) {
                    if (localStorage.toolkit > 0) {
                        // do the costs!
                        localStorage.land = Number(localStorage.land)-1;
                        localStorage.cland = Number(localStorage.cland)+1;
                        localStorage.toolkit = Number(localStorage.toolkit)-1;
                        click.play();
                        
                        // give the rewards!
                        randombiome = Math.floor(Math.random() * 2);
                        if (randombiome == 0) {
                            localStorage.wood = Number(localStorage.wood)+Math.floor(Math.random() * (21 - 15)) + 15;
                            localStorage.stone = Number(localStorage.stone)+Math.floor(Math.random() * (5 - 2)) + 2;
                            document.getElementById("news").innerText = "You identified that your land was a Forest! You cleared it!";
                        }

                        if (randombiome == 1) {
                            localStorage.stone = Number(localStorage.stone)+Math.floor(Math.random() * (21 - 15)) + 15;
                            randomNum = Math.floor(Math.random() * 5);
                            if (randomNum == 4) {
                                localStorage.iron = Number(localStorage.wood)+Math.floor(Math.random() * (4 - 1)) + 1;
                            }
                            document.getElementById("news").innerText = "You identified that your land was a Mountain! You cleared it!";
                        }

                    } else {
                        document.getElementById("news").innerText = "You realized that you didn't have enough tools...";
                        fail.play();
                    }
                } else {
                    document.getElementById("news").innerText = "You realized that there was no more land to clear...";
                    fail.play();
                }
            } else {
                localStorage.cland = 1;
            }
            document.getElementById("land").innerText = "Land (acres): "+localStorage.land;
            document.getElementById("cland").innerText = "Cleared Land (acres): "+localStorage.cland;
            document.getElementById("toolkit").innerText = "Toolkit: "+localStorage.toolkit;
            document.getElementById("wood").innerText = "Wood: "+localStorage.wood;
            document.getElementById("stone").innerText = "Stone: "+localStorage.stone;
            document.getElementById("iron").innerText = "Iron: "+localStorage.iron;
        }

        //build functions
        function Btoolkit() {
          if (localStorage.stone >= 10) {
            if (localStorage.wood >= 5) {
              localStorage.stone = Number(localStorage.stone)-10;
              localStorage.wood = Number(localStorage.wood)-5;
              localStorage.toolkit = Number(localStorage.toolkit)+5;

              document.getElementById("toolkit").innerText = "Toolkit: "+localStorage.toolkit;
              document.getElementById("wood").innerText = "Wood: "+localStorage.wood;
              document.getElementById("stone").innerText = "Stone: "+localStorage.stone;
              document.getElementById("news").innerText = "You just crafted 5 toolkits for your settlement!";
              click.play();

            } else {
              document.getElementById("news").innerText = "You sadly didn't have enough wood to craft toolkits...";
              fail.play();
            }
          } else {
            document.getElementById("news").innerText = "You sadly didn't have enough stone to craft toolkits...";
            fail.play();
          }
        }

        function Bhouse() {
          if (localStorage.stone >= 30) {
            if (localStorage.wood >= 30) {
              localStorage.stone = Number(localStorage.stone)-30;
              localStorage.wood = Number(localStorage.wood)-30;
              localStorage.house = Number(localStorage.house)+1;
              localStorage.cland = Number(localStorage.cland)-1;

              document.getElementById("house").innerText = "Houses: "+localStorage.house;
              document.getElementById("wood").innerText = "Wood: "+localStorage.wood;
              document.getElementById("stone").innerText = "Stone: "+localStorage.stone;
              document.getElementById("cland").innerText = "Cleared Land (acres): "+localStorage.cland;
              document.getElementById("news").innerText = "You just built a house in your settlement!";
              click.play();

              localStorage.people = Number(localStorage.people)+4;
              document.getElementById("people").innerText = "People: "+Math.floor(localStorage.people);

            } else {
              document.getElementById("news").innerText = "You sadly didn't have enough wood to build a house...";
              fail.play();
            }
          } else {
            document.getElementById("news").innerText = "You sadly didn't have enough stone to build a house...";
            fail.play();
          }
        }

        function Bfarm() {
          if (localStorage.stone >= 10) {
            if (localStorage.wood >= 20) {
              localStorage.stone = Number(localStorage.stone)-10;
              localStorage.wood = Number(localStorage.wood)-20;
              localStorage.farm = Number(localStorage.farm)+1;
              localStorage.cland = Number(localStorage.cland)-1;

              document.getElementById("food").innerText = "Food: "+localStorage.food;
              document.getElementById("wood").innerText = "Wood: "+localStorage.wood;
              document.getElementById("stone").innerText = "Stone: "+localStorage.stone;
              document.getElementById("farm").innerText = "Farms: "+localStorage.farm;
              document.getElementById("cland").innerText = "Cleared Land (acres): "+localStorage.cland;
              document.getElementById("news").innerText = "You just built a farm in your settlement!";
              click.play();

            } else {
              document.getElementById("news").innerText = "You sadly didn't have enough wood to build a farm...";
              fail.play();
            }
          } else {
            document.getElementById("news").innerText = "You sadly didn't have enough stone to build a farm...";
            fail.play();
          }
        }

        // auto gold
        int = setInterval(goldInterval, 1000);

        function goldInterval() {
          seconds -= 1
          if (seconds <= 0) {
            seconds = 1
            if (localStorage.people <= 1) {
            localStorage.gold = Number(localStorage.gold)
            } else {
              localStorage.gold = Number(localStorage.gold) + Number(localStorage.people);
            }
            document.getElementById("gold").innerText = "Gold: "+Math.floor(localStorage.gold);
          }
        }

        // auto farm
        intF = setInterval(farmInterval, 1000);

        function farmInterval() {
          Ftimer -= 1

          if (Ftimer == 0) {
            clearInterval(intF);
              Ftimer = 3;
              localStorage.food = Number(localStorage.food)+(localStorage.farm * localStorage.people);
              document.getElementById("food").innerText = "Food: "+Math.floor(localStorage.food);
              intF = setInterval(farmInterval, 1000);
          }
        }

        // hunger...
        hunger = setInterval(foodInterval, 1000);

        function foodInterval() {
          Htimer -= 1
          if (Htimer == 0) {
            localStorage.food = Number(localStorage.food)-localStorage.people;
            Htimer = 10;

            if (localStorage.food <= 0) {
              localStorage.food = 0;
              localStorage.people = Number(localStorage.people) - Number(localStorage.people)/4;
              Htimer = 10;
            }

            if (localStorage.people == 1) {
              localStorage.people = 0;
            }
          }
          
          document.getElementById("food").innerText = "Food: "+Math.floor(localStorage.food);
          document.getElementById("people").innerText = "People: "+Math.floor(localStorage.people);
        }


        function openTab(evt, tabName) {
          surface.play();
            var i, tabcontent, tablinks;
            tabcontent = document.getElementsByClassName("tabcontent");
            for (i = 0; i < tabcontent.length; i++) {
                tabcontent[i].style.display = "none";
            }
            tablinks = document.getElementsByClassName("tablinks");
            for (i = 0; i < tablinks.length; i++) {
                tablinks[i].className = tablinks[i].className.replace(" active", "");
            }
            document.getElementById(tabName).style.display = "block";
            evt.currentTarget.className += " active";
        }

        // Slider
        var music = document.getElementById("music");
        var sfx = document.getElementById("sfx");
        var musicDisplay = document.getElementById("musicDisplay");
        var sfxDisplay = document.getElementById("sfxDisplay");

        musicDisplay.innerHTML = music.value;
        sfxDisplay.innerHTML = sfx.value;

        music.oninput = function() {
          musicDisplay.innerHTML = this.value;
          surface.volume = this.value/100;
        }
        sfx.oninput = function() {
          sfxDisplay.innerHTML = this.value;
          click.volume = this.value/100;
          fail.volume = this.value/100;
        }
        
        // Set name
        function setName() {
          localStorage.settlement = document.getElementById("settlement").value;
          document.getElementById("settlement").value = localStorage.settlement;
          document.getElementById("news").innerText = "You renamed your settlement to "+localStorage.settlement;
          click.play();
        }

        // Reset Game
          function resetGame() {
            var destroy = prompt("Are you sure you want to reset your game? If yes, type 'delete' in the box below");
            if (destroy == "delete") {
              // reset variables
              localStorage.gold = 500;
              localStorage.land = 0;
              localStorage.cland = 0;
              localStorage.toolkit = 5;
              localStorage.settlement = "";
              localStorage.wood = 0;
              localStorage.stone = 0;
              localStorage.iron = 0;
              localStorage.house = 0;
              localStorage.people = 0;
              localStorage.food = 20;
              localStorage.farm = 0;

              // show variables
              showVar();
            }
          }

          
