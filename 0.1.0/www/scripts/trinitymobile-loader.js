/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. 
 * 
 * The initial developer of trinitymobile-loader.js is Rob Gerns.
 * Copyright 2012 Rob Gerns.  All rights reserved.*/

/*
 *  Function: testConnection
 *  
 *  Parameters: none
 *  
 *  Uses PhoneGap to test for network connectivity.
 */
function testConnection() {
    "use strict";
    
    //Get the connection type
	var networkConnection = navigator.network.connection.type;
	/*
	 *  Note - There seems to be a bug in PhoneGap that makes 
	 *  navigator.network.connection.type return null when there's no 
	 *  connection, when it should actually return CONNECTION.None. Not sure
	 *  if this only happens on Android. 2G, 3G, etc all return correct values.
	 */
	
	//As long as there's an Internet connection, go ahead, speed's irrelevant.
	if (networkConnection !== null) {
		connectivity = true;
	} else {
	    connectivity = false;
	}
	return connectivity;
}

/*
 *  Function: testConnection
 *  
 *  Parameters: none
 *  
 *  Call all the relevant trinjal methods and set up any necessary
 *  event listeners (for device hard/softkey presses, etc). 
 */

function onDeviceReady() {
    "use strict";
    
    //Check whether there is in fact an active network connection.
    var networkAvailable = testConnection();
    
    //If a network connection exists, call all the relevant methods/events.
    if (networkAvailable === true) {
        
        //Use trinjal library to get Trinity info, pass data to Trinity Mobile.
        trinjal.getNews("rss2", trinityMobile.newsResponse);
        trinjal.getBlog("rss2", trinityMobile.blogResponse);
        trinjal.getTwitter("", 25, trinityMobile.twitterResponse);
        trinjal.getFacebook(trinityMobile.facebookResponse);
        trinjal.getServiceTimes(true, trinityMobile.serviceTimesResponse);
        trinjal.getCalendar(30, trinityMobile.calendarResponse);
        
        //Use PhoneGap to call onMenuKeyDown when Menu button is pressed.
        document.addEventListener("menubutton", onMenuKeyDown, false);
    } else {
        //There's no Internet connection, so show an error page.
        window.location.href = "noconnection.html";
    }
}

(function() {
    //Use PhoneGap to wait until the device is ready before launching anything.
    document.addEventListener("deviceready", onDeviceReady, false);
    
})();