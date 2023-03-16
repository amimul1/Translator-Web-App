/* 
    Author: Amimul Ehsan Zoha
    Project: It is a full stack application using html,css , javascript, express and node.js.
    This javascript file is the client side file of the we application which Grab three value (from and to languages to 
    tranlate in between and the words/contents to translate) and create a url. This  used in this file to make a fetch request
    by using the fetch API to the server created using express.
 */


/* 
    This function runs whenever the front end undergoes a change and we have to handle an event 
    the normal flow of logic is fetch(url)- promise - grab text - then update text in html
    args: none
    return none but creates promise objects and handles the events accordingly by getting info from the
    server using the Fetch APi
 */
function translateWords() {

    var fromLang = document.getElementById('fromLang').value;
    var toLang = document.getElementById('toLang').value;
    var userInput = document.getElementById('userInput').value;
    console.log(fromLang);
    console.log(toLang);
    console.log(userInput);
    //constructing the url
   let url = 'http://localhost:5000/' + 'translate'+ '/' +  fromLang +  '2' + toLang + '/' + userInput;

   if(userInput!=""){

   // requesting the server using fetch API
   p = fetch(url);
      p.then(
        (response) => {
          return response.text();
        }
      )
      .then((text) => {
        if (text === 'undefined'){
            text='?';
        }
        ///updating the front end
        document.getElementById('output').value = text;
        console.log(text);
      })
      .catch( (error) => {
        console.log('THERE WAS A PROBLEM');
        console.log(error);
      });
    }

    else{
        document.getElementById('output').value = '';
    }
  
  }
  