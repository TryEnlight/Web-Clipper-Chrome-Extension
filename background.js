chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(
    sender.tab
      ? "from a content script:" + sender.tab.url
      : "from the extension"
  );
  console.log(request.selection);

  let clippings = [];
  chrome.storage.sync.get("list", function (result) {
    console.log(result);
    if (request.selection && result.list) {
      clippings = [...result.list, request.selection];
    } else if (result.list) {
      clippings = [...result.list];
    } else {
      clippings = [request.selection];
    }
    console.log(clippings);
    sendResponse({ clips: clippings });
    chrome.storage.sync.set({
      list: clippings,
    });
  });
  return true;
});

console.log("Stuff");

function addToNotes() {
  console.log("We here");
  chrome.tabs.executeScript(
    {
      code: "window.getSelection().toString();",
    },
    function (selection) {
      console.log("hi");
      document.getElementById("output").innerHTML = selection[0];
      console.log(selection[0]);
      console.log(document.getElementById("output").innerHTML);
      chrome.storage.sync.set("list", function (getEvent) {
        let clippings = [selection[0]];
        chrome.storage.sync.set({
          list: clippings,
        });
      });
    }
  );
}
