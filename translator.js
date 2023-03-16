/* 
    Author: Amimul Ehsan Zoha
    Project: It is a full stack application using html,css , javascript, express and node.js. This is the javascript server 
    side file which can be used to do basic simple translations between the 3 languages.
    English, Spanish and German. The source files are read using the relative path of spanish.txt and german.txt files
    which contains the translations are they are stored into a dictionary mapping structure. Special characters in the 
    other languages have been rightly dealt with so that we donot lose any important content by only going through the
    ASCII characters. Then, our user can request the translation either by doing a request through url which is handled using 
    express or through the front end which is handled by the client side js using Fetch API (which is the cleaner to do rather than
    XML request)
 */

// global variables which are dictionaries used to store the translation mappings
var e2s = {};
var s2e = {};
var e2g = {};
var g2e = {};
// using the lineReader module to read through the lines of the txt file
var lineNumber = 0;
const e = require('express');
const lineReader = require('line-reader');
lineReader.eachLine('./Spanish.txt', function (line, last) {
    if (lineNumber <
        10) {
        // skip the first 10 lines
        lineNumber++;
        return;
    }
    line =line.toLowerCase();
    const [english, spanishNotProcessed] = line.split('\t');
    var spanishProcessed = processString(spanishNotProcessed).trim();
    //adding the translation mappings to the dictionary
    e2s[english] = spanishProcessed;
    s2e[spanishProcessed] = english;
    if (last) { /* wrap-up code */
        //load the german dict
        loadGerman()
    }
    lineNumber++;
});
/* 
    This function reads in the lines of the german.txt file and stores the translation mappings from english to 
    german and from german to english by updating the respective dictionaries.
    args: none
    return:none 
 */
function loadGerman() {
    var lineNumber1 = 0;
    const lineReader1 = require('line-reader');
    lineReader1.eachLine('./German.txt', function (line1, last) {
        if (lineNumber1 <
            10) {
            // skip the first 10 lines
            lineNumber1++;
            return;
        }
        line1 =line1.toLowerCase();
        const [english, germanNotProcessed] = line1.split('\t');
        var germanProcessed = processString(germanNotProcessed).trim();
        e2g[english] = germanProcessed;
        g2e[germanProcessed] = english;
        if (last) { /* wrap-up code */
            // 
            //server set up code (express has been used)
            const express = require("express");
            const app = express();
            const port = 5000;
            app.use(express.static('public_html'));
            //using express routing to match the regex of the url
            app.get('/:requestName/:requestType/:contentNotProcessed', function(req,res){
                var requestName = req.params.requestName;
                if (requestName === 'translate') {
                    var requestType = req.params.requestType;
                    var contentNotProcessed = req.params.contentNotProcessed;
                    var contentProcessed = contentNotProcessed.replace(/\+/g, ' ');
                    var result = "";
                    //english to spanish translation 
                    if (requestType === 'e2s') {
                        var contentToTranslateArray = contentProcessed.split(" ");
                        for (let i = 0; i < contentToTranslateArray.length; i++) {
                            if (i == contentToTranslateArray.length - 1) {
                                if (e2s[contentToTranslateArray[i]]==null){
                                    result+='?';
                                }
                                else{
                                    result += e2s[contentToTranslateArray[i]];
                                }
                            }
                            else {
                                if (e2s[contentToTranslateArray[i]]==null){
                                    result+='?';
                                }
                                else{
                                    result += e2s[contentToTranslateArray[i]];
                                    result += " ";

                                }
                            }
                        }
                    }
                    //spanish to English translation 
                    if (requestType === 's2e') {
                        var contentToTranslateArray = contentProcessed.split(" ");

                        for (let i = 0; i < contentToTranslateArray.length; i++) {
                            if (i == contentToTranslateArray.length - 1) {
                                if (s2e[contentToTranslateArray[i]]==null){
                                    result+="?";
                                }
                                else{
                                    result += s2e[contentToTranslateArray[i]];
                                }   
                            }
                            else { 
                                if (s2e[contentToTranslateArray[i]]==null){
                                    result+="?";
                                }
                                else{
                                    result += s2e[contentToTranslateArray[i]];
                                }   
                                result += " ";
                            }

                        }
                    }
                    // german to english translation 
                    if (requestType === 'g2e') {
                        var contentToTranslateArray = contentProcessed.split(" ");

                        for (let i = 0; i < contentToTranslateArray.length; i++) {
                            if (i == contentToTranslateArray.length - 1) {

                                if (g2e[contentToTranslateArray[i]]==null){
                                    result+="?";
                                }
                                else{
                                    result += g2e[contentToTranslateArray[i]];
                                } 
                            }
                            else {
                                if (g2e[contentToTranslateArray[i]]==null){
                                    result+="?";
                                }
                                else{
                                    result += g2e[contentToTranslateArray[i]];
                                    result+=" "
                                } 
                            }

                        }
                    }
                    // english to german translation 
                    if (requestType === 'e2g') {
                        var contentToTranslateArray = contentProcessed.split(" ");

                        for (let i = 0; i < contentToTranslateArray.length; i++) {
                            if (i == contentToTranslateArray.length - 1) {
                                if (e2g[contentToTranslateArray[i]]==null){
                                    result+="?";
                                }
                                else{
                                    result += e2g[contentToTranslateArray[i]];
                                } 
                            }
                            else {
                                if (e2g[contentToTranslateArray[i]]==null){
                                    result+="?";
                                }
                                else{
                                    result += e2g[contentToTranslateArray[i]];
                                    result+=" "
                                } 
                            }

                        }
                    }
                    //german to spanish translation
                    if (requestType === 'g2s') {
                        var contentToTranslateArray = contentProcessed.split(" ");

                        for (let i = 0; i < contentToTranslateArray.length; i++) {
                            if (i == contentToTranslateArray.length - 1) {
                                const EnglishWordOfGerman = g2e[contentToTranslateArray[i]];
                                result+= e2s[EnglishWordOfGerman];
                            }
                            else {
                                const EnglishWordOfGerman = g2e[contentToTranslateArray[i]];
                                
                                result+= e2s[EnglishWordOfGerman];

                                result += " ";
                            }

                        }
                    }
                     //spanish to german translation
                    if (requestType === 's2g') {
                        var contentToTranslateArray = contentProcessed.split(" ");

                        for (let i = 0; i < contentToTranslateArray.length; i++) {
                            if (i == contentToTranslateArray.length - 1) {
                                const EnglishWordOfSpanish = s2e[contentToTranslateArray[i]];
                                result+= e2g[EnglishWordOfSpanish];
                            }
                            else {
                                const EnglishWordOfSpanish = s2e[contentToTranslateArray[i]];
                                
                                result+= e2g[EnglishWordOfSpanish];
                                result += " ";
                            }
                        }
                    }
                     res.send(result);
                }

                // if any other request is made other than translation request, output OK
                else {
                    // this is the case when the url path does not begin with translate 
                    //the server should look for the appropriate static file in public_html
                    //result = "OK"
                }
                
            });
            //app.use(express.static('public_html'));
            app.listen(port, function () {
                console.log(`Example app listening on port ${port}!`);
            });
        }
        lineNumber1++;
    });
}

/* 
    This function processes the strings which are the translated words so that it avoids description other than the 
    actual work for example, text saying the its a verb, etc. It is a super basic translation service so we do 
    only word by word
    Args: Str - The String to process
    return:String - the processed string
 */
function processString(str) {
    let processed = '';
    for (let i = 0; i < str.length; i++) {
      const char = str[i];
      // break when we see a character which signals the start of other info rather than the translation
      if (char === '/' || char===',' || char==='[' ||  char===']' || char==='.' || char==='-' || char==='(' || char===')'){
        break
      }
      processed+=char;
      
    }
    return processed;
}



