/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var Vector2 = require('vector2');
var Vibe = require('ui/vibe');

var SelectedActivity = 2;
var counterNum = 3;
var startTimeKey = 4;
var ActivityKey = 5;
var endTimeKey = 6;
var unitTypeKey = 7;
var startDateKey = 8;
var endDateKey = 9;

var unitTypeMenu= [
  {
    title: "Laps"
  },
  {
    title: "Loops"
  },
  {
    title: "Points"
  },
  {
    title: "Goals"
  },
  {
    title: "Meters"
  },
  {
    title: "Km"
  },
  {
    title: "In"
  },
  {
    title: "Feet"
  },
  {
    title: "Yards"
  },
  {
    title: "Miles"
  },
  {
    title: "Knots"
  },
  {
    title: "Things"
  }
];

function aboutScreen(window)
{
  // Top rectangle to blank out the page
  var rect = new UI.Rect({ 
    position: new Vector2(0, 0),
    size: new Vector2(144, 168),
    backgroundColor:'white'
  });

  var Logo = new UI.Image({
    position: new Vector2(0,0),
    size: new Vector2(144,168),
    backgroundColor: 'clear',
    borderColor: 'clear',
    image: 'images/eliseImageSmall.png'
  });

  var activityName = new UI.Text({
    position: new Vector2(0, 0),
    size: new Vector2(144, 40),
    text: "ActivityTracker",
    color: 'black',
    font:'Gothic-24-Bold',
    textAlign:'center',
    backgroundColor:'clear'
    
  });
  
  var authorName = new UI.Text({
    position: new Vector2(80, 112),
    size: new Vector2(64, 36),
    text: "Isaac Johnson",
    color: 'black',
    font:'Gothic-14',
    textAlign:'center',
    backgroundColor:'clear'
  }); 
  
  window.add(rect);
  window.add(Logo);
  window.add(activityName);
  window.add(authorName);
}

function mainScreen(window)
{
  var startTimeFNColor = "black";
  var startTimeBGColor = "white";
  var endTimeFNColor = "white";
  var endTimeBGColor = "black";
  if(Pebble.getActiveWatchInfo) {
    try {
        var watchinfo = Pebble.getActiveWatchInfo();
        var platform=watchinfo.platform;
        if (platform === "basalt")
        {
          startTimeFNColor = "darkGreen";
          startTimeBGColor = 'lightGray';
          endTimeFNColor = "bulgarianRose";
          endTimeBGColor = 'babyBlueEyes';
        }
      } catch(err) {
        startTimeFNColor = "darkGreen";
        startTimeBGColor = 'lightGray';
        endTimeFNColor = "bulgarianRose";
        endTimeBGColor = 'babyBlueEyes';
      }
  } 
  
  var keyVal = localStorage.getItem(SelectedActivity);
  var cVal = localStorage.getItem(counterNum);
  var unitTypeVal = localStorage.getItem(unitTypeKey);
  var startTime = localStorage.getItem(startTimeKey);
  var endTime = localStorage.getItem(endTimeKey);

  if (!cVal)
  {
    resetCounter(); 
    cVal = 0;
  }
  if (!keyVal)
  {
    setLSItem('activityType',SelectedActivity,'walking');
    keyVal = "walking";
  }
  if (!unitTypeVal)
  {
    setLSItem('unitType',unitTypeKey,'miles');
    unitTypeVal = "miles";
  }
  if (!startTime)
  {
    startTime = " ";
  }
  if (!endTime)
  {
    endTime = " ";
  }
  // Top rectangle to blank out the page
  var rect = new UI.Rect({ 
    position: new Vector2(0, 0),
    size: new Vector2(144, 168),
    backgroundColor:'white'
  });

  var imgKey = "green_activity.png";
  if ((keyVal === "biking")||(keyVal === "running")||(keyVal === "swimming")||(keyVal === "target")||(keyVal==="walking"))
  {
    imgKey = keyVal + "_64.png";
  } else {
    unitTypeVal = keyVal + ": " + unitTypeVal;
  }
  var activityLogo = new UI.Image({
    position: new Vector2(0,94),
    size: new Vector2(64,64),
    backgroundColor: 'clear',
    borderColor: 'clear',
    image: 'images/' + imgKey
  });

  var activityName = new UI.Text({
    position: new Vector2(65, 110),
    size: new Vector2(80, 40),
    text: unitTypeVal,
    color:'black',
    font:'Gothic-24-Bold',
    textAlign:'center',
    backgroundColor:'white'
    
  });

  var startTimeText = new UI.Text({
    position: new Vector2(0, 0),
    size: new Vector2(144, 24),
    text: startTime,
    color: startTimeFNColor,
    font:'Gothic-18-Bold',
    textAlign:'center',
    backgroundColor:startTimeBGColor 
  });

  
  var endTimeText = new UI.Text({
    position: new Vector2(0, 24),
    size: new Vector2(144, 24),
    text: endTime,
    color: endTimeFNColor,
    font:'Gothic-18-Bold',
    textAlign:'center',
    backgroundColor: endTimeBGColor
  });
    //font:'Roboto-Condensed-21',
  
  var counterText = new UI.Text({
    position: new Vector2(0, 45),
    size: new Vector2(144, 40),
    text: cVal,
    color:'black',
    font:'Roboto-Bold-Subset-49',
    textAlign:'center',
    backgroundColor:'white'
  });
  
  console.log('images/' + keyVal + '_64.png');
  
  window.add(rect);
  window.add(activityLogo);
  window.add(activityName);
  window.add(counterText);
  window.add(startTimeText);
  window.add(endTimeText);
}

// First Screen
var main = new UI.Window();
mainScreen(main);
main.show();

/*
var main = new UI.Card({
  title: 'Pebble.js',
  icon: 'images/menu_icon.png',
  subtitle: 'Hello World! ' + keyVal,
  body: 'Press any button.'
});
main.show();
*/

main.on('click','up',function(e) {
  incrCounter();
  startTimeIfUnset();
  mainScreen(main);
  main.show();
});

main.on('click','down',function(e) {
  decrCounter();
  mainScreen(main);
  main.show();
});

main.on('longClick','select',function(e) {
  resetCounter();
  mainScreen(main);
  main.show();
});
//        icon: 'images/menu_icon.png',
main.on('click', 'select', function(e) {
  var unitTypeVal = localStorage.getItem(unitTypeKey);
  var keyVal = localStorage.getItem(SelectedActivity);
  var menu = new UI.Menu({
    sections: [{
      items: [{
        title: ' Activity',
        icon: 'images/green_activity.png',
        subtitle: ' ' + keyVal
      }, {
        title: 'Units',
        subtitle: ' ' + unitTypeVal
      }, {
        title: 'About',
        subtitle: ' howdy howdy'
      }]
    }]
  });
 
  //configuration menu
  menu.on('select', function(e) {
    console.log('Selected item #' + e.itemIndex + ' of section #' + e.sectionIndex);
    console.log('The item is titled "' + e.item.title + '"');
    if (e.itemIndex === 0)
      {
        //
        var activityMenu = new UI.Menu();
        var activityString = localStorage.getItem(ActivityKey);
        var activityArray = activityString.split(",");
        var activityArrayLength = activityArray.length;
        for (var i = 0; i < activityArrayLength; i++) {
            var titleText = activityArray[i];
            // will change later...
            var iconText = "images/green_activity.png";
           
            // for activities for which i have icons
            if (titleText === "running")
            {
              iconText = "images/running_32.png";
            } else if (titleText === "swimming")
            {
              iconText = "images/swimming_32.png";
            } else if (titleText === "biking")
            {
              iconText = "images/biking_32.png";
            } else if (titleText === "walking")
            {
              iconText = "images/walking_32.png";
            } else if (titleText === "target")
            {
              iconText = "images/target_32.png";
            } 
            //activityMenu.item(0, i, { title: " " + titleText, subtitle: " " + subText, icon: iconText });
            activityMenu.item(0, i, { title: " " + titleText, icon: iconText });
        }  
        menu.hide();
        activityMenu.show();
        
        activityMenu.on('select', function(ee) {
          console.log('setting to ' + ee.itemIndex);
          setLSItem('activity',SelectedActivity,activityArray[ee.itemIndex]);
          // lets be smart... and set the related Unit Type while here
          if (activityArray[ee.itemIndex] === "target")
          {
            setLSItem('unitType',unitTypeKey,"Points");
          } else if (activityArray[ee.itemIndex] === "swimming") {
            setLSItem('unitType',unitTypeKey,"Laps");
          } else {
            setLSItem('unitType',unitTypeKey,"Miles");
          }
          // now redraw main
          activityMenu.hide();
          mainScreen(main);
          main.show();
        });
      } else if (e.itemIndex === 1)
      {
        // second item
        var displayMenu = new UI.Menu({
          sections: [{
            title: 'Select Unit Type',
            items: unitTypeMenu
          }]
        });

        displayMenu.on('select', function(ee) {
          console.log('unit type setting to ' + ee.itemIndex);
          setLSItem('unitType',unitTypeKey,unitTypeMenu[ee.itemIndex].title);
          // now redraw main
          displayMenu.hide();
          mainScreen(main);
          main.show();
        });
        menu.hide();
        displayMenu.show();
  
      } else if (e.itemIndex === 2)
      {
        // 3rd item    
        menu.hide();
        var aboutS = new UI.Window();
        aboutScreen(aboutS);
        aboutS.show();
      }
  });
  menu.show();
});

main.on('longClick', 'up', function(e) {
  startTheTime();
  mainScreen(main);
  main.show();
  /* 
  var wind = new UI.Window({
    fullscreen: true,
  });
  var textfield = new UI.Text({
    position: new Vector2(0, 65),
    size: new Vector2(144, 30),
    font: 'gothic-24-bold',
    text: 'Text Anywhere!',
    textAlign: 'center'
  });
  wind.add(textfield);
  wind.show();
  */
});
main.on('longClick', 'down', function(e) {
  endTheTime();
  mainScreen(main);
  main.show();

  /*
  var card = new UI.Card();
  card.title('A Card');
  card.subtitle('Is a Window');
  card.body('The simplest window type in Pebble.js.');
  card.show();
  */
});

Pebble.addEventListener('showConfiguration', function(e) {
  // Show config page
  Pebble.openURL('https://ba407445e522ef561e589012c006d144a5784a2a-www.googledrive.com/host/0B_fxXZ0azjzTOXc5NTJIdWZtZ0U');
});

Pebble.addEventListener('webviewclosed',
  function(e) {
    //console.log('Configuration window returned: ' + e.response);
    var configuration = JSON.parse(decodeURIComponent(e.response));
    console.log('name maybe: ', configuration.name.toString());
    // show the values store
    var cbNum = 0;
    for (var k in configuration) {
        // use hasOwnProperty to filter out keys from the Object.prototype
        if (configuration.hasOwnProperty(k)) {
            console.log('key is: ' + k + ', value is: ' + configuration[k]);
            var pattern = /-/;
            var foundList = k.split(pattern);
            var i, len;
            if (foundList[0] == "checkbox")
            {
              console.log("checkbox was found...");
              if (configuration[k])
              {
                console.log("and it is set to true...");
                if (cbNum === 0)
                {
                  setLSItem('Activity',ActivityKey,foundList[1]);
                }
                else
                {
                  addLSItem('Activity',ActivityKey,foundList[1]);
                }
                cbNum++;
                // push this Activity into the Activity list
              }
            }
            for (i = 0, len = foundList.length; i < len; i++){
              console.log("foundList " + i + " = " + foundList[i]);
            }
        }
    }
    console.log('Configuration window returned: ', JSON.stringify(configuration));
    //{"name":"Namehete","special-feature":"off","txtName":"gggg",
    //"checkbox-swimming":false,"checkbox-running":false,"checkbox-walking":true,
    //"checkbox-biking":false,"checkboxgggg":true}
     
  }
);

function addLSItem(keyDesc,keyNum,keyVal)
{
  var keyExistingVal = localStorage.getItem(keyNum);
  console.log(keyDesc + ': key ' + keyNum + ' was set to ' + keyExistingVal);
  localStorage.setItem(keyNum,keyExistingVal + ',' + keyVal);
  console.log(keyDesc + ': key ' + keyNum + ' is now set to ' + keyExistingVal + ',' + keyVal);
}

function setLSItem(keyDesc,keyNum,keyVal)
{
  console.log(keyDesc + ': key ' + keyNum + ' set to ' + keyVal);
  localStorage.setItem(keyNum,keyVal);
}

function showLSItem(keyDesc,keyNum)
{
  var keyVal = localStorage.getItem(keyNum);
  console.log(keyDesc + ": keyNum " + keyNum + " value is: " + keyVal);
}

function incrCounter()
{
  Vibe.vibrate('short'); 
  var cVal = localStorage.getItem(counterNum);
  cVal = parseInt(cVal) + 1;
  setLSItem('counter incr',counterNum,cVal);
  var tD = new Date();
  var startTime = localStorage.getItem(startTimeKey);
  var startDate = localStorage.getItem(startDateKey);
  var duration = Math.ceil((Date.parse(tD.toLocaleDateString() + ' ' + tD.toLocaleTimeString()) - Date.parse(startDate + ' ' + startTime))/60000);
  setLSItem('end time',endTimeKey,duration + " min...");
}

function decrCounter()
{
  Vibe.vibrate('double'); 
  var cVal = localStorage.getItem(counterNum);
  if (parseInt(cVal) > 0)
  {
   cVal = parseInt(cVal) - 1;
  }
  setLSItem('counter decr',counterNum,cVal);
}

function resetCounter()
{
  notifyOnComplete();
  setLSItem('start time',startTimeKey,"");
  setLSItem('end time',endTimeKey,"");
  setLSItem('counter reset',counterNum,0);
}

function startTimeIfUnset()
{
  var startTime = localStorage.getItem(startTimeKey);
  if (!startTime)
  {
    var thisTime = new Date();
    setLSItem('start time',startTimeKey,thisTime.toLocaleTimeString());
    setLSItem('start date',startDateKey,thisTime.toLocaleDateString());
    setLSItem('end time',endTimeKey,"");
  }
}

function startTheTime()
{
  var thisTime = new Date();
  setLSItem('end time',endTimeKey,"");
  setLSItem('start time',startTimeKey,thisTime.toLocaleTimeString());
  setLSItem('start date',startDateKey,thisTime.toLocaleDateString());
}

function endTheTime()
{
  var thisTime = new Date();
  setLSItem('end time',endTimeKey,thisTime.toLocaleTimeString());
  setLSItem('end date',endDateKey,thisTime.toLocaleDateString());
}


/* ------------------------------------
 End of Activity Notification
 ---------------------------------------*/

function notifyOnComplete() {
  var tD = new Date();
 
  // startTime or now if not set
  var startTime = localStorage.getItem(startTimeKey);
  var startDate = localStorage.getItem(startDateKey);
  var dateObj = new Date(startDate + " " + startTime);
  if (!startTime)
  {
    dateObj = new Date();    
  }
  
  var unitTypeVal = localStorage.getItem(unitTypeKey);
  
  // activity name or walking if not set
  var keyVal = localStorage.getItem(SelectedActivity);
  if (!keyVal)
  {
    keyVal = "walking";
  }
  
  // End Time or Now if not set
  var endTime = localStorage.getItem(endTimeKey);
  var endDate = localStorage.getItem(endDateKey);
  if ((!endTime)||(endTime.indexOf("min") > -1))
  {
    endTime = tD.toLocaleTimeString();
    endDate = tD.toLocaleDateString();
  }
  
  // date hardcoded cause its not important.. we are just mathing time...
  console.log("times: start " + startTime + " and end " + endTime);
  console.log("local Date string: " + tD.toLocaleDateString());
  var duration = Math.ceil((Date.parse(endDate + ' ' + endTime) - Date.parse(startDate + ' ' + startTime))/60000);
  console.log('duration:' + duration);
  
  var cVal = localStorage.getItem(counterNum);
  var shortTitle = keyVal + ':' + startDate + " " + startTime + ' - ' + endDate + " " + endTime + ' (' + duration + ' min): ' + cVal + ' ' + unitTypeVal;
  Pebble.showSimpleNotificationOnPebble("Activity Tracker", shortTitle);
  Vibe.vibrate('long'); 
}
