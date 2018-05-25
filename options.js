(function() {
  document.addEventListener("DOMContentLoaded", restoreFromStorage);
  document
    .getElementById("save")
    .addEventListener("click", parseAndSaveOptions);
  document
    .getElementById("addPhrase")
    .addEventListener("click", () => addPhrase("", ""));

  function parseAndSaveOptions() {
    let tableRows = [].slice.call(
      document.querySelectorAll("tr.replace-section")
    );
    let oldValue, newValue, pair;
    let phrases = tableRows
      .map(element => {
        oldValue = element.querySelector(".oldValue").value;
        newValue = element.querySelector(".newValue").value;
        pair = {};
        pair["oldValue"] = oldValue;
        pair["newValue"] = newValue;
        return !!oldValue && !!newValue ? pair : undefined;
      })
      .filter(p => !!p);

    saveToStorage(phrases, function() {
      let status = document.getElementById("status");
      status.textContent = "Options saved.";
      setTimeout(function() {
        status.textContent = "";
      }, 1000);
      restoreFromStorage();
    });
  }

  function saveToStorage(phrases, callback) {
    chrome.storage.sync.set(
      {
        phrases: phrases
      },
      callback
    );
  }

  function restoreFromStorage() {
    chrome.storage.sync.get(
      {
        phrases: []
      },
      function(items) {
        items = items || {};
        items.phrases = items.phrases || [];

        clearPhrasesTable();

        items.phrases.forEach(pair => {
          addPhrase(pair.oldValue, pair.newValue);
        });
      }
    );
  }

  function clearPhrasesTable() {
    var table = document.getElementById("phrasesTable");
    while (table.rows.length > 0) {
      table.deleteRow(0);
    }
  }

  function addPhrase(oldValue, newValue) {
    var table = document.getElementById("phrasesTable");
    var tr = document.createElement("tr");
    tr.className = "replace-section";
    let oldValueCell = createCellWIthInput("oldValue", oldValue);
    let newValueCell = createCellWIthInput("newValue", newValue);
    tr.appendChild(oldValueCell);
    tr.appendChild(newValueCell);
    table.appendChild(tr);

    function createCellWIthInput(type, value) {
      var td = document.createElement("td");
      var input = document.createElement("input");
      input.className = type;
      input.value = value;
      td.appendChild(input);
      return td;
    }
  }
})();
