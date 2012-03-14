/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/. 
 * 
 * The initial developer of trinitymobile-main.js is Rob Gerns.
 * Copyright 2012 Rob Gerns.  All rights reserved.*/

/*
 * Function: TrinityMobile
 * 
 * Parameters: none
 * 
 * Constructor function that holds all of the various methods that handle
 * data that's passed in from called trinjal methods.
 * 
 */

function TrinityMobile() {
    "use strict";
    
    //newsResponse method handles the Trinity News XML data
    this.newsResponse = function (args, trinityNewsXML) {

        
        var i = 0,
            //Get the currently used jQuery Mobile theme, defaults to a.
            tcCurrentTheme = $("div").attr("data-theme") || "a",
            
            //Used to create an LI element that will hold an item's date.
            tcNewsDateLI = "",
            
            //All of the RSS feed items.
            tcNewsItems = trinityNewsXML.getElementsByTagName("item"),
            
            tcNewsItemDate = "",
            tcNewsItemDateOrig = "",
            tcNewsItemLink = "",
            tcNewsItemTitle = "",
            tcNewsLength = tcNewsItems.length,
            
            //Used to create an LI element that will hold the link to the item.
            tcNewsLinkLI = "",
            
            //The place in the HTML where new markup should be inserted.
            tcNewsUL = document.getElementById("tcNews-ul");

        //This method doesn't use any arguments so make it null to be safe.
        args = null;

        //Grab each news item's title, link, and date...description isn't needed.
        for (i = 0; i < tcNewsLength; i++) {
            tcNewsItemTitle = tcNewsItems[i].getElementsByTagName("title")[0].
                firstChild.nodeValue;
            tcNewsItemLink = tcNewsItems[i].getElementsByTagName("link")[0].
                firstChild.nodeValue;
            tcNewsItemDateOrig = tcNewsItems[i].getElementsByTagName("pubDate")[0].
                firstChild.nodeValue;
            
            //Remove the timestamp from the date, as that's not really relevant.
            tcNewsItemDate = tcNewsItemDateOrig.replace(
                /\s\d\d[:]\d\d[:]\d\d\s.+/,
                ""
            );

            //Create a new LI with the correct theme, write the item's date.
            tcNewsDateLI = document.createElement("li");
            tcNewsUL.appendChild(tcNewsDateLI);
            tcNewsDateLI.setAttribute("data-role", "list-divider");
            tcNewsDateLI.setAttribute("data-theme", tcCurrentTheme);
            tcNewsDateLI.innerHTML = tcNewsItemDate;

            //Create a new LI with the correct theme, write the item's title.
            tcNewsLinkLI = document.createElement("li");
            tcNewsUL.appendChild(tcNewsLinkLI);
            tcNewsLinkLI.setAttribute("id", "news-item-link" + i);
            tcNewsLinkLI.setAttribute("data-theme", tcCurrentTheme);
            tcNewsLinkLI.setAttribute("style", "padding-left: 5px");

            tcNewsLinkLI.innerHTML = "<p><a href=\"" +
                tcNewsItemLink +
                "\" style=\"white-space: normal; color: blue;" +
                " text-decoration: none\">" +
                tcNewsItemTitle +
                "</a></p>";
        }
        
        //Done, so go back to the place where this method was called.
        return true;
    };

    //blogResponse method handles the Trinity Blog XML data.   
    this.blogResponse = function (args, trinityBlogXML) {

        var i = 0,
            //tcBlogDescriptionContainer = "", - unused for now.
            tcBlogItem = "",
            tcBlogItems = trinityBlogXML.getElementsByTagName("item"),
            tcBlogItemDate = "",
            tcBlogItemDateOrig = "",
            //tcBlogItemDescription = "", - unused for now.
            //tcBlogItemDescriptionOrig = "", - unused for now.
            tcBlogItemLink = "",
            tcBlogItemTitle = "",
            tcBlogItemTitleOrig = "",
            
            //The place where new HTML should be inserted.
            tcBlogUL = document.getElementById("tcBlog-ul");

        //This method doesn't have any arguments, so set it to null to be safe.
        args = null;

        //Get each item's title, link, and date (description doesn't work for now).
        for (i = 0; i < 10; i++) {

            tcBlogItemTitleOrig = tcBlogItems[i].
                getElementsByTagName("title")[0].
                firstChild.nodeValue;
            //remove any in-line styles from the title
            tcBlogItemTitle =
                tcBlogItemTitleOrig.
                replace(/style=\"[a-zA-Z0-9\-\:\;\s]+\"/gi, "");
            
            tcBlogItemLink = tcBlogItems[i].getElementsByTagName("link")[0].
                firstChild.nodeValue;
            
            /*tcBlogItemDescriptionOrig = tcBlogItems[i].
                getElementsByTagName("description")[0].firstChild.nodeValue;
            tcBlogItemDescription =
                tcBlogItemDescriptionOrig.
                replace(/style=\"[a-zA-Z0-9\-\:\;\s]+\"/gi, "");*/
            
            tcBlogItemDateOrig = tcBlogItems[i].
                getElementsByTagName("pubDate")[0].firstChild.nodeValue;
            //Remove the timestamp from the date.
            tcBlogItemDate =
                tcBlogItemDateOrig.replace(/\s\d\d[:]\d\d[:]\d\d\s.+/, "");
            
            //Create a new element for the item and write in the date and title.
            tcBlogItem = document.createElement("h3");
            tcBlogUL.appendChild(tcBlogItem);
            tcBlogItem.innerHTML =
                tcBlogItemDate +
                //Make the title into a link to the full post.
                "<br/><a href=\"" +
                tcBlogItemLink +
                "\" style=\"font-size: small; " +
                "padding:0 0 0 2px; white-space: normal;\">" +
                tcBlogItemTitle +
                "</a>";
          
          //Can't get this to work properly...so it's disabled for now
          //
          //tcBlogDescriptionContainer = document.createElement("div");
          //tcBlogUL.appendChild(tcBlogDescriptionContainer);
          //tcBlogDescriptionContainer.innerHTML = tcBlogItemDescription;
        }
        
        //Done, so go back to the place where this method was called.
        return true;
    };

    //twitterResponse method handles the @trinityeastonpa XML data.
    this.twitterResponse = function (args, trinityTwitterXML) {

        var i = 0,
        
            //Links that are in a tweet, not the URL to the tweet itself.
            newStatusLinks = "",
            statusLinks = "",
            
            //Get the current jquery mobile theme, default to "a."
            tcCurrentTheme = $("div").attr("data-theme") || "a",
            
            //Used to reference a specific tweet the loop processes.
            tcStatus = "",
            
            tcStatusDate = "",
            tcStatusDateOrig = "",
            
            //All of the statuses found in the XML.
            tcStatuses = trinityTwitterXML.getElementsByTagName("item"),
            tcStatusLength = tcStatuses.length,
            
            //URL to a specific tweet.
            tcStatusURL = "",
            
            //Not the location of the tweet but what app was used to tweet.
            tcTweetFrom = "",
            
            //Used to create an LI element to insert a given tweet's HTML.
            tcTwitterLI = "",
            
            //The tweet's description with all of the links reformatted.
            tcTwitterStatus = "",
            //The tweet's description prior to links being reformatted.
            tcTwitterStatusOrig = "",
            
            //The place in the document where the new markup should be inserted.
            tcTwitterUL = document.getElementById("tcTwitter-ul");

        //There are no parameters for this method, so make this null to be safe.
        args = null;

        //Loop to process every tweet in the feed, one at a time.
        for (i = 0; i < tcStatusLength; i++) {

            //The tweet (item) object currently being processed.
            tcStatus = tcStatuses[i];

            //The tweet itself, otherwise known as the status or description.
            tcTwitterStatusOrig =
                tcStatus.getElementsByTagName("description")[0].
                    firstChild.nodeValue;

            //Get any links that are in the tweet.
            statusLinks = tcTwitterStatusOrig.match(/http:\/\/\b.\S+/);
            //And reformat them into working links.
            newStatusLinks = "<a href=\"" + statusLinks +
                "\" style=\"color: blue\">" + statusLinks + "</a>";

            //Replace any links with the corresponding new working links.
            tcTwitterStatus = tcTwitterStatusOrig.replace(statusLinks,
                    newStatusLinks);

            //Get the date the tweet was posted.
            tcStatusDateOrig = tcStatus.getElementsByTagName("pubDate")[0].
                firstChild.nodeValue;

            //Remove the +0000 from the datetime.
            tcStatusDate = tcStatusDateOrig.replace(/[+]\d\d\d\d/, ' ');

            //Get the URL to the tweet.
            tcStatusURL = tcStatus.getElementsByTagName("link")[0].
                firstChild.nodeValue;

            //Get whatever was used to post the tweet (web, specific app, etc).
            tcTweetFrom = tcStatus.getElementsByTagName("source")[0].
                firstChild.nodeValue;

            //Create a new element and write the markup to show the tweet.
            tcTwitterLI = document.createElement("li");
            tcTwitterUL.appendChild(tcTwitterLI);
            tcTwitterLI.setAttribute("data-theme", tcCurrentTheme);
            tcTwitterLI.setAttribute("data-icon", "false");
            tcTwitterLI.innerHTML = "<p style=\"white-space: normal;\">" +
                tcTwitterStatus;
            tcTwitterLI.innerHTML += "</p><span style=\"font-size: x-small\">" +
                tcStatusDate + " via " + tcTweetFrom + "</span>";
        }
        
        //Done, so go back to the place where this method was called.
        return true;
    };
    
    
    //facebookResponse method handles the relevant Facebook XML data.
    this.facebookResponse = function (args, trinityFacebookXML) {

        var i = 0,
            //The XML item containing the Facebook status/post info.
            tcEntry = "",
            
            //The author of the status.
            tcFacebookBy = "",
            tcFacebookByName = "",
            
            //The actual post.
            tcFacebookContent = "",
            
            //When the status was posted.
            tcFacebookDate = "",
            tcFacebookDateOrig = "",
            
            //These are used to do various regex operations to format the date.
            tcFacebookDateMod = "",
            tcFacebookDateMod2 = "",
            tcFacebookDateMod3 = "",
            tcFacebookDateMod4 = "",
            tcFacebookDateMod5 = "",
            tcFacebookDateMod6 = "",
            tcFacebookDateMod7 = "",
            
            //The time of the post was published in HH:MM:SS.
            tcFacebookDateTime = "",
            
            //Where to place the markup.
            tcFacebookDiv = document.getElementById("tcFacebook"),
            
            //All of the posts.
            tcFacebookEntries =
                trinityFacebookXML.getElementsByTagName("entry"),
            tcFacebookLength = tcFacebookEntries.length,
            
            //The URL to an individual post.
            tcFacebookLink = "",
            
            //The title of an individual post.
            tcFacebookTitle = "";

        //This method has no parameters, so set this to null to be safe.
        args = null;

        //A loop that processes each entry one at a time.
        for (i = 0; i < tcFacebookLength; i++) {

            //The object (entry/post) currently being processed
            tcEntry = tcFacebookEntries[i];

            //Get the post's title
            tcFacebookTitle = tcEntry.getElementsByTagName("title")[0].
                firstChild.nodeValue;
            
            //Get the post's URL.
            tcFacebookLink = tcEntry.getElementsByTagName("link")[0].
                getAttribute("href");

            //Get the datetime the post was published.
            tcFacebookDateOrig = tcEntry.getElementsByTagName("published")[0].
                firstChild.nodeValue;
            
            //Date is originally formatted: YYYY-MM-DDTHH:MM:SS+00:00
            tcFacebookDateMod =
                //remove +00:00, date is now YYYY-MM-DDTHH:MM:SS
                tcFacebookDateOrig.replace(/\+\d*\D\d*/, '');
            tcFacebookDateMod2 =
                //remove T, date is now YYYY-MM-DD HH:MM:SS
                tcFacebookDateMod.replace(/T/, ' ');
            tcFacebookDateMod3 =
                //remove :SS, date is now YYYY-MM-DD HH:MM
                tcFacebookDateMod2.replace(/:\d\d$/,'');
            tcFacebookDateTime = 
                //get the hours and minutes
                tcFacebookDateMod3.match(/\d\d:\d\d/);
            tcFacebookDateMod4 =
                //remove the time, date is now YYYY-MM-DD
                tcFacebookDateMod3.replace(/\s\d\d:\d\d/,'');
            tcFacebookDateYear = 
                //get the year and the following -
                tcFacebookDateMod4.match(/^\d\d\d\d-/);
            tcFacebookDateMod5 = 
                //remove the year and following dash, date is now MM-DD
                tcFacebookDateMod4.replace(/\d\d\d\d-/, '');
            tcFacebookDateMod6 =
                //add year and time to end, date is now MM-DD-YYYY-
                tcFacebookDateMod5 + '-' + tcFacebookDateYear;
            tcFacebookDateMod7 = 
                //remove final dash, date is now MM-DD-YYYY
                tcFacebookDateMod6.replace(/-$/,'');
            tcFacebookDate = 
                //add the time back, date is now MM-DD-YYYY HH:MM
                tcFacebookDateMod7 + ' ' + tcFacebookDateTime;

            //Get the author of the post.
            tcFacebookBy = tcEntry.getElementsByTagName("author")[0];
            tcFacebookByName = tcFacebookBy.getElementsByTagName("name")[0].
                firstChild.nodeValue;
            
            //Get the actual post itself.
            tcFacebookContent = tcEntry.getElementsByTagName("content")[0].
                firstChild.nodeValue;

            //Create the appropriate markup to display the Facebook post.
            tcFacebookDiv.innerHTML += "<p style=\"font-size:large;" +
                "font-weight:bold\">";
            tcFacebookDiv.innerHTML += tcFacebookDate + "</p><br/>";
            tcFacebookDiv.innerHTML += tcFacebookContent + "<br/>";
            tcFacebookDiv.innerHTML += "<p style=\"font-size: x-small\">";
            tcFacebookDiv.innerHTML += "Posted by " + tcFacebookByName +
                "<br/><br/>";
            tcFacebookDiv.innerHTML += "<a href='" + tcFacebookLink + "'>" +
                tcFacebookLink + "</a>";
            tcFacebookDiv.innerHTML += "</p><hr style=\"color: black;\"/>";
        }
        
        //Done, so go back to the place where this method was called.
        return true;
    };
    
    //calendarResponse method handles any calendar XML data.
    this.calendarResponse = function (args, trinityCalendarXML) {
    
        var i = 0,
        
            //Where to place the HTML markup.
            tcCalendar = document.getElementById("tcCalendar");
        
            //All of the events (actual events) defined in the calendar XML.
            tcCalendarItems = trinityCalendarXML.getElementsByTagName("item"),
            
            //The description of the event.
            tcCalendarItemDesc = "",
            
            //The link to the event on the calendar website.
            tcCalendarItemLink = "",
            
            tcCalendarLength = tcCalendarItems.length,
            
            //Used for writing the events into the HTML.
            tcCalendarLinkLI = "",
            
            //The currently used jQuery mobile theme, defaults to "a."
            tcCurrentTheme = $("div").attr("data-theme") || "a";
        
        //This method doesn't use parameters, so set args to null to be safe.
        args = null;
        
        //Process each calendar event (item), one at a time.
        for (i = 0; i < tcCalendarLength; i++) {
            
            //Get the event's link
            tcCalendarItemLink = tcCalendarItems[i].getElementsByTagName("link")[0].
                firstChild.nodeValue;
            
            //Get the event description, which also contains the date and time.
            tcCalendarItemDesc = tcCalendarItems[i].getElementsByTagName("description")[0].
                firstChild.nodeValue;

            //Create the appropriate HTML markup and add it to the document.
            tcCalendarP = document.createElement("p");
            tcCalendar.appendChild(tcCalendarP);
            tcCalendarP.setAttribute("id", "Calendar-item-link" + i);
            tcCalendarP.setAttribute("data-theme", tcCurrentTheme);
            tcCalendarP.setAttribute("style", "padding-left: 5px");

            tcCalendarP.innerHTML = tcCalendarItemDesc +
                "<a href=\"" +
                tcCalendarItemLink +
                "\" style=\"white-space: normal; color: blue;" +
                " text-decoration: none\">" +
                "More Information" +
                "</a>" +
                "<hr/>";
        }
        
        //Done, so go back to the place where this method was called.
        return true;
    };

    //serviceTimesResponse method handles the relevant Service Times XML data.
    this.serviceTimesResponse = function (args, serviceTimesXML) {

        var i = 0,
            j = 0,
            
            //Get all the services that are defined in the XML.
            tcAllServices = serviceTimesXML.getElementsByTagName("service"),
            tcAllServicesLength = tcAllServices.length,
            
            //Get any special services that are defined in the XML.
            tcAllSpecial = serviceTimesXML.getElementsByTagName("special"),
            
            //The location of the service (church, chapel, etc).
            tcLocation = "",
            
            //The service that's being processed by the loop.
            tcService = "",
            
            //The day of the service.
            tcServiceDayOrig = "",
            
            //The day of the service reformatted.
            tcServiceDay = "",
            
            //The place in the document to insert the markup for Service Times.
            tcServiceTimesDiv = document.getElementById("tcServiceTimes"),
            
            tcSpecialLength = tcAllSpecial.length,
            
            //The place in the document to insert markup for Special Services.
            tcSpecialServiceTimesDiv =
                document.getElementById("tcSpecialServiceTimes"),
            
            //Info about any special services.
            tcSpecialLocation = "",
            tcSpecialService = "",
            tcSpecialServiceDay = "",
            tcSpecialServiceDate = "",
            tcSpecialTime = "",
            tcSpecialType = "",
            
            //The time of the service.
            tcTime = "",
            
            //What kind of service.
            tcType = "";

        //This method doesn't have any parameters, so make args null to be safe.
        args = null;
        
        //Process any special services first.
        for (i = 0; i < tcSpecialLength; i++) {

            //The current special service's object.
            tcSpecialService = tcAllSpecial[i];
            
            //Get the special service's day (Sunday, Monday, Tuesday, etc).
            tcSpecialServiceDay =
                tcSpecialService.getElementsByTagName("day")[0].
                    firstChild.nodeValue;
            
            //Get the date of the special service.
            tcSpecialServiceDate =
                tcSpecialService.getElementsByTagName("date")[0].
                    firstChild.nodeValue;
            
            //Get the special service's time.
            tcSpecialTime =
                tcSpecialService.getElementsByTagName("time")[0].
                    firstChild.nodeValue;
            
            //Get the special service's type info (baptism, Christmas, etc).
            tcSpecialType =
                tcSpecialService.getElementsByTagName("servicetype")[0].
                    firstChild.nodeValue;
            
            //Get the location of the special service (church, chapel, etc).
            tcSpecialLocation =
                tcSpecialService.getElementsByTagName("location")[0].
                    firstChild.nodeValue;

            //Add the appropriate HTML markup to the document.
            tcSpecialServiceTimesDiv.innerHTML +=
                "<h3 style='color: #0000cf'>" +
                tcSpecialServiceDay + " " + tcSpecialServiceDate + "</h3>";
            tcSpecialServiceTimesDiv.innerHTML += "<p>" +
                "<span style='font-weight: bold'>" + tcSpecialTime;
            tcSpecialServiceTimesDiv.innerHTML += "</span><br/>" +
                tcSpecialType +
                "<br/><br/>";
            tcSpecialServiceTimesDiv.innerHTML += "Location: " + 
                tcSpecialLocation +
                "</p><hr/>";
        }

        //Process each "regular" service, one at time.
        for (j = 0; j < tcAllServicesLength; j++) {

            //The service object currently being processed.
            tcService = tcAllServices[j];
            
            //Get the day of the service (Sunday, Monday, etc).
            tcServiceDayOrig = tcService.parentNode.nodeName;
            //Make the day's first letter uppercase.
            tcServiceDay = tcServiceDayOrig.substr(0, 1).toUpperCase() +
                tcServiceDayOrig.substr(1);
            
            //Get the time of the service.
            tcTime = tcService.getElementsByTagName("time")[0].
                firstChild.nodeValue;
            
            //Get the type of service (Holy Eucharist, Noon Prayer, etc).
            tcType = tcService.getElementsByTagName("servicetype")[0].
                firstChild.nodeValue;
            
            //Get the location of the service (church, chapel, etc).
            tcLocation = tcService.getElementsByTagName("location")[0].
                firstChild.nodeValue;

            //Add the appropriate HTML to the document.
            tcServiceTimesDiv.innerHTML += "<h3>" +
                tcServiceDay + "</h3>";
            tcServiceTimesDiv.innerHTML += "<p>" +
                "<span style='font-weight: bold'>" + tcTime;
            tcServiceTimesDiv.innerHTML += "</span><br/>" + tcType +
                "<br/><br/>";
            tcServiceTimesDiv.innerHTML += "Location: " + tcLocation +
                "</p><hr/>";
        }
        
        //Done, so go back to the place where this method was called.
        return true;
    };
}

//Create a new global instance of the trinityMobile object
var trinityMobile = new TrinityMobile();
