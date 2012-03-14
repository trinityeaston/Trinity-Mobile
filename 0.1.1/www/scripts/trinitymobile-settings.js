/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. 
 * 
 * The initial developer of trinitymobile-settings.js is Rob Gerns.
 * Copyright 2012 Rob Gerns.  All rights reserved.*/


/*
 * Function: onMenuKeyDown
 * 
 * Parameters: none
 * 
 * Typical PhoneGap function to handle when device menu key is pressed.
 * 
 */

function onMenuKeyDown() {
    "use strict";
    
    //Use jQuery Mobile to change to the menuOptions page...
    $.mobile.changePage("#menuOptions", {
        transition : "slideup",
        //...and to make the page into a dialog box. (Nifty right?)
        role : "dialog"
    });
}



/*
 * Various jQuery Mobile functions to handle swiping gestures on certain pages
 * and how the Android hardware back button works.
 * 
 */

//On the Service Times page, users can swipe left or right 
$('#pageServiceTimes').live("swipeleft", function(){
    var regularPage = $('#pageSpecialServiceTimes');
    // swipe using id of Regular Service Times page
    if (regularPage) {
    $.mobile.changePage(regularPage, 'slide');
    }
    });
    $('#pageSpecialServiceTimes').live("swiperight", function(){
    var specialPage = $('#pageServiceTimes');
    // swipe using id of Special Service Times page
    if (specialPage) {
    $.mobile.changePage(specialPage, 'slide', true);
        }
    });

//If on the main page and the Back button is pressed, exit the app
$('#pageMain').live("pagebeforecreate", function(){
    document.addEventListener("backbutton", onMainBackKeyDown, true);
});
function onMainBackKeyDown(){
    navigator.app.exitApp();
}
    
//Make Android hardware Back button go back to main page (unless on main page)
$('#pageNews').live("pagebeforecreate", function(){
    document.removeEventListener("backbutton", onMainBackKeyDown, true);
    document.addEventListener("backbutton", onBackKeyDown, true);
    });
$('#pageBlog').live("pagebeforecreate", function(){
    document.removeEventListener("backbutton", onMainBackKeyDown, true);
    document.addEventListener("backbutton", onBackKeyDown, true);
    });
$('#pageTwitter').live("pagebeforecreate", function(){
    document.removeEventListener("backbutton", onMainBackKeyDown, true);
    document.addEventListener("backbutton", onBackKeyDown, true);
    });
$('#pageFacebook').live("pagebeforecreate", function(){
    document.removeEventListener("backbutton", onMainBackKeyDown, true);
    document.addEventListener("backbutton", onBackKeyDown, true);
    });
$('#pageServiceTimes').live("pagebeforecreate", function(){
    document.removeEventListener("backbutton", onMainBackKeyDown, true);
    document.addEventListener("backbutton", onBackKeyDown, true);
    });
$('#pageCalendar').live("pagebeforecreate", function(){
    document.removeEventListener("backbutton", onMainBackKeyDown, true);
    document.addEventListener("backbutton", onBackKeyDown, true);
    });
$('#pageMap').live("pagebeforecreate", function(){
    document.removeEventListener("backbutton", onMainBackKeyDown, true);
    document.addEventListener("backbutton", onBackKeyDown, true);
    });
//When on any page other than main, back button navigates to main page
function onBackKeyDown(){
    var mainMenu = $('#pageMain');
    $.mobile.changePage(mainMenu);
}
    
/*
 * Function: applyTheme
 * 
 * Parameters: none
 * 
 * Check to see if a new theme was selected and applied, if so switch themes
 * by sending the webView to an HTML file that uses the desired theme.
 * 
 * This is actually easier than re-writing the DOM every time and doesn't
 * come undone if there's a quirky page refresh.  However, it's not the most
 * elegant solution and may cause odd behavior when using the device's back
 * button.
 * 
 */

function applyTheme() {
    "use strict";
    var i = 0,
        //The index page that uses the selected theme.
        newPage = "",
        
        //The new theme.
        theme = "",
        
        //The theme that's been selected.
        themeOptions = document.changeThemeForm.themeChoice;

    //Look at each theme option to see which one is checked.
    for (i = 0; i < themeOptions.length; i++) {

        //Set theme to the selected theme's value (a, b, c, d).
        if (themeOptions[i].checked) {
            theme = themeOptions[i].value;
        }
    }

    //If selected theme is anything other than a, appropriately set newPage.
    if (theme !== "a") {
        newPage = "index" + theme + ".html";
    } else {
        //Otherwise use the default "a" theme by using the default index.html.
        newPage = "index.html";
    }
    
    //Send the app/webview to the appropriate new page. 
    window.location.href = newPage;
}