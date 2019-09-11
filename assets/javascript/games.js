$(document).ready(function() {
  var yourMatchingNumber = 0;
  var randomNum = randomNumGen();
  var wins = 0;
  var losses = 0;
  var rupees;

  function randomNumRupees() {
    return {
      red: {
        points: Math.floor(Math.random() * 12) + 1,
        imageUrl:"assets/images/TLoZ_Series_Red_Rupee_Artwork.png"
      },
      blue: {
        points: Math.floor(Math.random() * 12) + 1,
        imageUrl:"assets/images/TLoZ_Series_Blue_Rupee_Artwork.png"
      },
      yellow: {
        points: Math.floor(Math.random() * 12) + 1,
        imageUrl:"assets/images/346px-TP_Yellow_Rupee_Render.png"
      },
      green: {
        points: Math.floor(Math.random() * 12) + 1,
        imageUrl:"assets/images/TLoZ_Series_Green_Rupee_Artwork.png"
      }
    };
  }

  function randomNumGen() {
    return Math.floor(Math.random() * 102) + 19;
  }

  function setGame() {
    yourMatchingNumber = 0;
    rupees = randomNumRupees();
    randomNum = randomNumGen();
    $("#random-area").text(randomNum);
  }

  function updateDom(didUserWin) {
    $("#win-area").empty();

    if (didUserWin === true) {
      $("#win-area").append($("<p>").text("Link got his Rupees!!"));
      setGame();
      renderMatchingNumber();
    }
  
    else if (didUserWin === false) {
      $("#win-area").append($("<p>").text("Link lost his Rupees"));
      setGame();
      renderMatchingNumber();
    }

    var wSpan = $("<span>").text(wins);
    var lSpan = $("<span>").text(losses);

    var pWins = $("<p>").text("Wins: ");
    var pLosses = $("<p>").text("Losses: ");

    pWins.append(wSpan);
    pLosses.append(lSpan);

    $("#win-area").append(pWins);
    $("#win-area").append(pLosses);
  }

  function renderRupees() {
    for (var key in rupees) {
      var rupeesDiv = $("<div class='rupees-button' data-name='" + key + "'>");
      var rupeesImg = $("<img alt='image' class='rupees-img'>").attr("src", rupees[key].imageUrl);
      rupeesDiv.append(rupeesImg);
      $("#rupees-area").append(rupeesDiv);
    }
  }

  function updateMatchingNumber(rupees) {
    yourMatchingNumber += rupees[rupees.attr("data-name")].points;
  }

  function renderMatchingNumber() {
    var scoreNumDiv = $("<div id='score-number'>").text(yourMatchingNumber);
    $("#score-area").html();
    $("#score-area").html(scoreNumDiv);
  }

  setGame();
  updateDom();
  renderRupees();
  renderMatchingNumber();

  $(".rupees-button").on("click", function(event) {
    updateMatchingNumber($(this));
    renderMatchingNumber();

    if (yourMatchingNumber === randomNum) {
      wins++;
      setGame();
      updateDom(true);
      
    }

    else if (yourMatchingNumber > randomNum) {
      losses++;
      setGame();
      updateDom(false);
    }
  });

});