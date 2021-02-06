
//////////////// global vars /////////////////

//light
let night = false;

//animals
let crab = false;
let fish = false;
let jellyfish = false;
let fireflies = false;

//badges
let sunrise = false;
let sunset = false;
let rainbow = false;
let whale = false;

//pointer states
let regularCursor = true;
let waitCursor = false;
let blackCursor = false;

//game states
let newGame = true;
let gameStarted;
let gameoverState = false;
let gamewonState = false;

//audio
var musicBackground = new Audio('audio/music.mp3');
var beachDay = new Audio('audio/beach-day.mp3');
var beachNight = new Audio('audio/beach-night.mp3');
var whaleSounds = new Audio('audio/whale-sound.mp3');

//////////////// run when html loads /////////////////
$(document).ready(function() {

  resetGame();
  showCursor();

  $( "#card-button" ).click(function() {
    startGame();
  });

  $( "#day-button" ).click(function() {
    dayButtonClicked();
  });

  $( "#earth-zone" ).click(function() {
    earthZoneClicked();
  });

  $( "#water-zone" ).click(function() {
    waterZoneClicked();
  });

  $( "#replay-button" ).click(function() {
    resetGame();
    startGame();
  });
  //social buttons
  $( "#whatsapp-button" ).click(function() {
    window.open("https://api.whatsapp.com/send?text=Nature%20is%20calling,%20check%20out%20The%20Island%20https://joshuamv.github.io/the-island/");
  });

  $( "#facebook-button" ).click(function() {
    window.open("https://www.facebook.com/sharer/sharer.php?u=https://joshuamv.github.io/the-island/");
  });

  $( "#twitter-button" ).click(function() {
    window.open("http://twitter.com/share?text=Nature is calling, explore The Island?&url=https://joshuamv.github.io/the-island/&hashtags=TheIsland");
  });

  // //dev
  // setInterval(devUpdateNames, 500);

});

//////////////// functions /////////////////

//click functions

function startGame() {
  //if the game just started
  if (newGame == true) {
    //music
    musicBackground.loop = true;
    musicBackground.play();
    beachDay.loop = true;
    beachDay.play();

    newGame = false;
    //hide info card
    $(".main-title").css("opacity", "0");
    $(".info-card").css("bottom", "-60%");
    setTimeout(function() {
      //show day button
      $(".day-button").css("opacity", "1");
      $(".main-title").css("display", "none");
      gameStarted = true;
    }, 1300);
    //do not display info card so the page can't scroll down to it
    setTimeout(function() {
      $(".info-card").css("display", "none");
    }, 500);
  }
  //if continuing the game after winning one badge
  if (newGame == false && gameStarted == true) {

    //play day beach sounds
    beachDay.load();
    beachDay.loop = true;
    beachDay.play();

    $(".info-card").css("bottom", "-60%");
    $(".day-button").css("opacity", "1");
    //hide info card so the page can't scroll down to it
    setTimeout(function() {
      $(".info-card").css("display", "none");
    }, 500);
    //reset video to day and all animal vars
    resetDaytime();
  }
}

function showCursor() {
  const cursor = document.querySelector('.cursor');
  const cursorMini = document.querySelector('.cursor-mini');
  var hoverCursor = false;
  $('.day-button').hover(function(){hoverCursor = true});
  $('.water-zone').hover(function(){hoverCursor = true});
  $('.earth-zone').hover(function(){hoverCursor = true});
  $('.day-button').mouseleave(function(){hoverCursor = false});
  $('.water-zone').mouseleave(function(){hoverCursor = false});
  $('.earth-zone').mouseleave(function(){hoverCursor = false});
  document.addEventListener('mousemove', e => {
      cursor.setAttribute("style", "top: "+(e.pageY - 40)+"px; left: "+(e.pageX - 40)+"px;");
      cursorMini.setAttribute("style", "top: "+(e.pageY - 4)+"px; left: "+(e.pageX - 4)+"px;");
      if (hoverCursor == true) {
        cursor.setAttribute("style", "top: "+(e.pageY - 40)+"px; left: "+(e.pageX - 40)+"px; border: 1px solid #FFBD00;");
        cursorMini.setAttribute("style", "top: "+(e.pageY - 4)+"px; left: "+(e.pageX - 4)+"px; background: #FFBD00;");
      }
  });

  document.addEventListener('click', () => {
      cursor.classList.add("expand");

      setTimeout(() => {
          cursor.classList.remove("expand");
      }, 500)
  });
}

function resetDaytime() {
  //hide all other videos
  $("#night-video").hide();
  $("#sunset-video").hide();
  $("#sunrise-video").hide();
  $("#rainbow-video").hide();
  $("#whale-video").hide();
  $("#crab-video").hide();
  $("#fish-video").hide();
  $("#fireflies-video").hide();
  $("#jellyfish-video-day").hide();
  $("#jellyfish-video-night").hide();
  // show day time video
  $("#day-video").show();
  night = false;
  crab = false;
  fish = false;
  jellyfish = false;
  fireflies = false;
  //reset day button
  $(".button-switch").css("margin-left", "4px");
  //reset background
  $("body").css("background-color", "#ABC4D1");
  $(".button-switch").css("background-color", "#ABC4D1");
}

function resetGame() {
  resetDaytime();
  sunrise = false;
  sunset = false;
  rainbow = false;
  whale = false;
  //show blue card button
  $("#card-button").show();
  //hide social buttons and reply grey button
  $("#whatsapp-button").hide();
  $("#facebook-button").hide();
  $("#twitter-button").hide();
  $("#replay-button").hide();
}

function gameWon() {
  //change card content when last video is done
  setTimeout(function() {
    //confetti
    gameConfetti();
    $(".info-card").css("display", "flex");
    setTimeout(function() {
      $(".info-card").css("bottom", "0%");
    }, 100);
    $("h2").html("You made it!");
    $("#p1").html("Sunset, Sunrise, Whale and Rainbow. You earned all the badges!");
    $("#p2").html("Now that you've mastered The Island, go ahead and share it with more people. Or just keep exploring it. Don't worry, you won't lose your badges.");
    //hide blue card button
    $("#card-button").hide();
    //show social buttons and reply grey button
    $("#whatsapp-button").show();
    $("#facebook-button").show();
    $("#twitter-button").show();
    $("#replay-button").show();
  }, 2000);
}


function gameConfetti() {
  $("body").append("<script>confetti.start(3000, 100);</script>");
}

function dayButtonClicked() {
  if (night == false) {
    night = true;
    nightIn();
    return;
  }
  if (night == true) {
    night = false;
    dayIn();
    return;
  }
}

function earthZoneClicked() {

  if (night == false) {
    //crab video
    if (crab == false) {
      playCrabInVideo();
      return;
    }
    if (crab == true) {
      playCrabOutVideo();
      return;
    }
  }
  if (night == true) {
    //fireflies video
    if (fireflies == false) {
      playFirefliesInVideo();
      return;
    }
    if (fireflies == true) {
      playFirefliesOutVideo();
      return;
    }
  }
}

function waterZoneClicked() {
  if (night == false) {
    //fish video
    if (fish == false) {
      playFishInVideo();
      return;
    }
    if (fish == true) {
      playFishOutVideo();
      return;
    }
  }
  if (night == true) {
    //jellyfish video
    if (jellyfish == false) {
      playJellyfishInVideo();
      return;
    }
    if (jellyfish == true) {
      playJellyfishOutVideo();
      return;
    }
  }
}

// swap and play video functions

function fadeVideo(videoIn, videoOut) {
  videoIn.fadeIn(100, "linear");
  videoOut.fadeOut(500, "linear");
}

function gameOverVideo() {
  //sink island video day

  //sink island video night
}

function dayIn() {
  // beachNight = new Audio('audio/beach-night.mp3');
  beachNight.pause();
  //island was alone in nighttime
  if (fireflies == false) {
    night = false;
    //change night button to day
    $(".button-switch").css("margin-left", "4px");
    playDayInVideo();
    return;
  }
  //island was with fireflies in nighttime
  if (fireflies == true) {
    night = false;
    //change night button to day
    $(".button-switch").css("margin-left", "4px");
    playFirefliesOutVideo();
    return;
  }
}

function playDayInVideo() {
  //change main title color to blue
  $("h1").css("color", "#B8D0DD");
  //island is alone
  if (jellyfish == false) {
    //change background and button to match day
    $("body").css("background-color", "#ABC4D1");
    $(".button-switch").css("background-color", "#ABC4D1");
    $("#day-video").show();
    $("#night-video").hide();
    return;
  }
  //island with jellyfish
  if (jellyfish == true) {
    //change background and button to match day
    $("body").css("background-color", "#ABC4D1");
    $(".button-switch").css("background-color", "#ABC4D1");
    $("#jellyfish-video-day").show();
    $("#jellyfish-video-night").hide();
    return;
  }
}

function nightIn() {
  // beachNight = new Audio('audio/beach-night.mp3');
  beachNight.load();
  beachNight.loop = true;
  beachNight.play();
  //island was alone in daytime
  if (crab == false && fish == false) {
    night = true;
    //change day button to night
    $(".button-switch").css("margin-left", "54px");
    playNightInVideo();
    return;
  }
  //island was with crabs in daytime
  if (crab == true) {
    night = true;
    //change day button to night
    $(".button-switch").css("margin-left", "54px");
    playCrabOutVideo();
    return;
  }
  //island was with fish in daytime
  if (fish == true) {
    night = true;
    //change day button to night
    $(".button-switch").css("margin-left", "54px");
    playFishOutVideo();
    return;
  }
}

function playNightInVideo() {
  //change main title color to grey
  $("h1").css("color", "#2B2B2B");
  //island is alone
  if (jellyfish == false) {
    //change background and button to match night
    $("body").css("background-color", "#000212");
    $(".button-switch").css("background-color", "#000212");
    $("#night-video").show();
    $("#day-video").hide();
    return;
  }
  //island with jellyfish
  if (jellyfish == true) {
    //change background and button to match night
    $("body").css("background-color", "#000212");
    $(".button-switch").css("background-color", "#000212");
    $("#jellyfish-video-night").show();
    $("#jellyfish-video-day").hide();
    return;
  }
}

function playCrabInVideo() {
  //crab in day
  if (crab == false && fish == false && jellyfish == false) {
    crab = true;
    fadeVideo($("#crab-video"), $("#day-video"));
    return;
  }
  //crab in with fish --> play sunset
  if (crab == false && fish == true) {
    crab = true;
    playSunsetVideo();
    return;
  }
  //crab in with jellyfish --> play rainbow
  if (crab == false && jellyfish == true) {
    crab = true;
    playRainbowVideo();
    return;
  }
  alert("no if ran crab in");
}

function playCrabOutVideo() {
  //crab out, day stay
  if (crab == true && night == false) {
    crab = false;
    fadeVideo($("#day-video"), $("#crab-video"));
    return;
  }
  //crab out, night in
  if (crab == true && night == true) {
    crab = false;
    //change background and button to match night
    $("body").css("background-color", "#000212");
    $(".button-switch").css("background-color", "#000212");
    $("#crab-video").hide();
    $("#night-video").show();
    return;
  }
  alert("no if ran crab out");
}

function playFishInVideo() {
  //fish in day
  if (fish == false && crab == false && jellyfish == false) {
    fish = true;
    fadeVideo($("#fish-video"), $("#day-video"));
    return;
  }
  //fish in with crab --> play sunset
  if (fish == false && crab == true) {
    fish = true;
    playSunsetVideo();
    return;
  }
  //fish in with jellyfish --> play whale
  if (fish == false && jellyfish == true) {
    fish = true;
    playWhaleVideo();
    return;
  }
  alert("no if ran fish in");
}

function playFishOutVideo() {
  //fish out, day stay
  if (fish == true && night == false) {
    fish = false;
    fadeVideo($("#day-video"), $("#fish-video"));
    return;
  }
  //fish out night in
  if (fish == true && night == true) {
    fish = false;
    //change background and button to match night
    $("body").css("background-color", "#000212");
    $(".button-switch").css("background-color", "#000212");
    $("#fish-video").hide();
    $("#night-video").show();
    return;
  }
  alert("no if ran fish out");
}

function playJellyfishInVideo() {
  //jellyfish in, night stay
  if (jellyfish == false && fireflies == false) {
    jellyfish = true;
    fadeVideo($("#jellyfish-video-night"), $("#night-video"));
    return;
  }
  //jellyfish in night with fireflies --> play sunrise
  if (jellyfish == false && fireflies == true) {
    jellyfish = true;
    playSunriseVideo();
    return;
  }
  alert("no if ran, jelly in");
}

function playJellyfishOutVideo() {
  //jellyfish out, night stay
  if (jellyfish == true && night == true) {
    jellyfish = false;
    fadeVideo($("#night-video"), $("#jellyfish-video-night"));
    return;
  }
  alert("no if ran, jelly out");
}

function playFirefliesInVideo() {
  //fireflies in, night stay
  if (fireflies == false && jellyfish == false) {
    fireflies = true;
    fadeVideo($("#fireflies-video"), $("#night-video"));
    return;
  }
  //fireflies in with jellyfish --> play sunrise
  if (fireflies == false && jellyfish == true) {
    fireflies = true;
    playSunriseVideo();
    return;
  }
  alert("no if ran, fireflies in");
}

function playFirefliesOutVideo() {
  //fireflies out, night stay
  if (fireflies == true && night == true) {
    fireflies = false;
    fadeVideo($("#night-video"), $("#fireflies-video"));
    return;
  }
  //fireflies out, day in
  if (fireflies == true && night == false) {
    fireflies = false;
    $("#fireflies-video").hide();
    $("#day-video").show();
    //make background and button daytime colors
    $("body").css("background-color", "#ABC4D1");
    $(".button-switch").css("background-color", "#ABC4D1");
    return;
  }
  alert("no if ran fireflies out");
}

//badges

function displayBadges() {
  //check which badges to display
  if (sunrise == true) {
    $("#sunrise-badge").html('<img src="images/sunrise-badge.png" alt="sunrise-badge" />');
    $("#sunrise-badge").css("border", "0");
  }
  if (sunset == true) {
    $("#sunset-badge").html('<img src="images/sunset-badge.png" alt="sunset-badge" />');
    $("#sunset-badge").css("border", "0");
  }
  if (rainbow == true) {
    $("#rainbow-badge").html('<img src="images/rainbow-badge.png" alt="rainbow-badge" />');
    $("#rainbow-badge").css("border", "0");
  }
  if (whale == true) {
    $("#whale-badge").html('<img src="images/whale-badge.png" alt="whale-badge" />');
    $("#whale-badge").css("border", "0");
  }
}

function playSunriseVideo() {
  sunrise = true;
  //pause night audio
  beachNight.pause();
  displayBadges();
  $("body").css("background-color", "#D0BDDF");
  $(".button-switch").css("background-color", "#D0BDDF");
  //hide day button
  $(".day-button").css("opacity", "0");
  // play sunrise video
  $("#jellyfish-video-night").hide();
  $("#fireflies-video").hide();
  $("#sunrise-video").show();
  $("#sunrise-video").get(0).play();
  //if all badges are earner run gameWon and exit this function
  if (sunrise == true && sunset == true && rainbow == true && whale == true) {
    gameWon();
    return;
  }
  //change card content when sunrise video is done
  setTimeout(function() {
    $(".info-card").css("display", "flex");
    setTimeout(function() {
      $(".info-card").css("bottom", "0%");
    }, 100);
    $("#card-button").html("Continue");
    $("h2").html("The Sunrise badge!");
    $("#p1").html("Daytime can only last for so long. You’ve discovered sunrises!");
    $("#p2").html("There's still more to discover whenever you're ready.");
  }, 2000);
}

function playSunsetVideo() {
  sunset = true;
  displayBadges();
  $("body").css("background-color", "#DF942F");
  $(".button-switch").css("background-color", "#DF942F");
  //hide day button
  $(".day-button").css("opacity", "0");
  // play sunset video
  $("#fish-video").hide();
  $("#crab-video").hide();
  $("#sunset-video").show();
  $("#sunset-video").get(0).play();
  //if all badges are earned run gameWon and exit this function
  if (sunrise == true && sunset == true && rainbow == true && whale == true) {
    gameWon();
    return;
  }
  //change card content when sunset video is done
  setTimeout(function() {
    $(".info-card").css("display", "flex");
    setTimeout(function() {
      $(".info-card").css("bottom", "0%");
    }, 100);
    $("#card-button").html("Continue");
    $("h2").html("The Sunset badge!");
    $("#p1").html("Daytime can only last for so long. You’ve discovered sunsets!");
    $("#p2").html("There's still more to discover whenever you're ready.");
  }, 2000);
}

function playRainbowVideo() {
  rainbow = true;
  displayBadges();
  //hide day button
  $(".day-button").css("opacity", "0");
  // play rainbow video
  $("#jellyfish-video-day").hide();
  $("#crab-video").hide();
  $("#rainbow-video").show();
  $("#rainbow-video").get(0).play();
  //if all badges are earner run gameWon and exit this function
  if (sunrise == true && sunset == true && rainbow == true && whale == true) {
    gameWon();
    return;
  }
  //change card content when rainbow video is done
  setTimeout(function() {
    $(".info-card").css("display", "flex");
    setTimeout(function() {
      $(".info-card").css("bottom", "0%");
    }, 100);
    $("#card-button").html("Continue");
    $("h2").html("The Rainbow badge!");
    $("#p1").html("Amazing what a little water and a little sun can do. Isn’t that one the most colorful badges you’ve ever seen?");
    $("#p2").html("There's still more to discover whenever you're ready.");
  }, 3000);
}

function playWhaleVideo() {
  whale = true;
  //play whale sounds
  whaleSounds.load();
  whaleSounds.play();

  displayBadges();
  //hide day button
  $(".day-button").css("opacity", "0");
  // play whale video
  $("#fish-video").hide();
  $("#jellyfish-video-day").hide();
  $("#whale-video").show();
  $("#whale-video").get(0).play();
  //if all badges are earner run gameWon and exit this function
  if (sunrise == true && sunset == true && rainbow == true && whale == true) {
    gameWon();
    return;
  }
  //change card content when whale video is done
  setTimeout(function() {
    $(".info-card").css("display", "flex");
    setTimeout(function() {
      $(".info-card").css("bottom", "0%");
    }, 100);
    $("#card-button").html("Continue");
    $("h2").html("The Whale badge!");
    $("#p1").html("You’ve earned the badge of the oceans. That’s one of the rare ones!");
    $("#p2").html("There's still more to discover whenever you're ready.");
  }, 3000);
}

//dev

function devUpdateNames() {

  if (crab == true) {
    $("#crab-dev").css("color", "green");
  }
  if (fish == true) {
    $("#fish-dev").css("color", "green");
  }
  if (fireflies == true) {
    $("#fireflies-dev").css("color", "green");
  }
  if (jellyfish == true) {
    $("#jellyfish-dev").css("color", "green");
  }


  if (crab == false) {
    $("#crab-dev").css("color", "red");
  }
  if (fish == false) {
    $("#fish-dev").css("color", "red");
  }
  if (fireflies == false) {
    $("#fireflies-dev").css("color", "red");
  }
  if (jellyfish == false) {
    $("#jellyfish-dev").css("color", "red");
  }


  if (sunrise == true) {
    $("#sunrise-dev").css("color", "green");
  }
  if (sunset == true) {
    $("#sunset-dev").css("color", "green");
  }
  if (rainbow == true) {
    $("#rainbow-dev").css("color", "green");
  }
  if (whale == true) {
    $("#whale-dev").css("color", "green");
  }


  if (sunrise == false) {
    $("#sunrise-dev").css("color", "red");
  }
  if (sunset == false) {
    $("#sunset-dev").css("color", "red");
  }
  if (rainbow == false) {
    $("#rainbow-dev").css("color", "red");
  }
  if (whale == false) {
    $("#whale-dev").css("color", "red");
  }
}
