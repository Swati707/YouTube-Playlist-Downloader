      // Client ID and API key from the Developer Console
      var CLIENT_ID = '645820373610-2gh864cvol9tfgp107qnftddu1ehjh2h.apps.googleusercontent.com';
      //var CLIENT_ID = '933612916870-ak1uut9odpm2t0qlev2a2dra9cnidjgv.apps.googleusercontent.com';
      // Array of API discovery doc URLs for APIs used by the quickstart
      var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"];
      // Authorization scopes required by the API. If using multiple scopes,
      // separated them with spaces.
      var SCOPES = 'https://www.googleapis.com/auth/youtube.readonly';
      var authorizeButton = document.getElementById('authorize-button');
      var signoutButton = document.getElementById('signout-button');
      /**
       *  On load, called to load the auth2 library and API client library.
       */
      function handleClientLoad() {
        console.log("check1");
        gapi.load('client:auth2', initClient);
      }
      /**
       *  Initializes the API client library and sets up sign-in state
       *  listeners.
       */
      function initClient() {
        console.log("check2");
        gapi.client.init({
          discoveryDocs: DISCOVERY_DOCS,
          clientId: CLIENT_ID,
          scope: SCOPES
        }).then(function () {
          console.log("check3");
          // Listen for sign-in state changes.
          gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
          // Handle the initial sign-in state.
          updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
          authorizeButton.onclick = handleAuthClick;
          signoutButton.onclick = handleSignoutClick;
        });
        console.log("check4");
      }
      /**
       *  Called when the signed in status changes, to update the UI
       *  appropriately. After a sign-in, the API is called.
       */
      function updateSigninStatus(isSignedIn) {
        if (isSignedIn) {
          authorizeButton.style.display = 'none';
          signoutButton.style.display = 'block';
          getChannel();
        } else {
          authorizeButton.style.display = 'block';
          signoutButton.style.display = 'none';
        }
      }
      /**
       *  Sign in the user upon button click.
       */
      function handleAuthClick(event) {
        gapi.auth2.getAuthInstance().signIn();
      }
      /**
       *  Sign out the user upon button click.
       */
      function handleSignoutClick(event) {
        gapi.auth2.getAuthInstance().signOut();
      }
      /**
       * Append text to a pre element in the body, adding the given message
       * to a text node in that element. Used to display info from API response.
       *
       * @param {string} message Text to be placed in pre element.
       */
      function appendPre(message) {
        var pre = document.getElementById('content');
        var textContent = document.createTextNode(message + '\n');
        pre.appendChild(textContent);
      }
      /**
       * Print files.
       */
      function getChannel() {
        gapi.client.youtube.channels.list({
          'part': 'snippet,contentDetails,statistics',
          'forUsername': 'GoogleDevelopers'
        }).then(function(response) {
          var channel = response.result.items[0];
          appendPre('This channel\'s ID is ' + channel.id + '. ' +
                    'Its title is \'' + channel.snippet.title + ', ' +
                    'and it has ' + channel.statistics.viewCount + ' views.');
        });
      }
      function check()
      {
        console.log("jtfgh");
      }

      document.addEventListener('DOMContentLoaded', () => {
        //authorizeButton.style.display = "block";
        handleClientLoad();
        console.log("success");
      });