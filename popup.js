window.onload = function() {
    // var bgPage = chrome.extension.getBackgroundPage();
    // bgPage.addToNotes();
    console.log("We here");
    chrome.tabs.executeScript( {
    code: "window.getSelection().toString();"
    }, function(selection) {
//      console.log("hi");
//      document.getElementById("output").innerHTML = selection[0];
//      console.log(selection[0]);
//      console.log(document.getElementById("output").innerHTML);
//      chrome.storage.sync.set("list", function(getEvent) {
//          let clippings = [selection[0]];
//          chrome.storage.sync.set({
//              "list": clippings
//          });
//      });
        chrome.runtime.sendMessage({selection: selection[0]}, function(response) {
            console.log(response);
            document.getElementById("output").innerHTML = response.clips;
        });
    });
}

