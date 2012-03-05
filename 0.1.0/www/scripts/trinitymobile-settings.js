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