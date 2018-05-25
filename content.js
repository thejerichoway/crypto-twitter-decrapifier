init();

function init() {
  chrome.storage.sync.get(
    {
      phrases: []
    },
    initDecrapify
  );
}

function initDecrapify(items) {
  items.phrases.forEach(p => {
    const regexp = new RegExp(p.oldValue, "ig");
    document.body.innerHTML = document.body.innerHTML.replace(
      regexp,
      p.newValue
    );
  });
}
