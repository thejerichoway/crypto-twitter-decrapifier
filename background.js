chrome.runtime.onInstalled.addListener(initDefaultPhrases);

function initDefaultPhrases(details) {
  if (details.reason === "install") {
    let defaultPhrases = [
      {
        oldValue: "Nobody is talking about this",
        newValue: "I'm full of bologna but I want to sound mysterious"
      },
      {
        oldValue: "Most people don't understand this",
        newValue: "All I'm gonna say next is just a bunch of bs"
      }
    ];

    chrome.storage.sync.set({
      phrases: defaultPhrases
    });
  }
}
