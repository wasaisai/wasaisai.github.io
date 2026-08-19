(function () {
  "use strict";

  function initEntrySwitcher() {
    var entryLinks = document.querySelectorAll(".side-nav-entries a");
    var notes = document.querySelectorAll("article.note[id]");
    if (!entryLinks.length || !notes.length) return;

    var noteById = {};
    notes.forEach(function (note) {
      noteById[note.id] = note;
    });

    function showNote(id) {
      entryLinks.forEach(function (link) {
        link.classList.remove("is-active");
      });

      notes.forEach(function (note) {
        note.classList.remove("is-visible");
      });

      var targetLink = Array.from(entryLinks).find(function (link) {
        return link.getAttribute("href") === "#" + id;
      });
      if (targetLink) {
        targetLink.classList.add("is-active");
      }

      if (noteById[id]) {
        noteById[id].classList.add("is-visible");
      }
    }

    entryLinks.forEach(function (link) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        var id = link.getAttribute("href").replace("#", "");
        showNote(id);
        history.replaceState(null, "", "#" + id);
      });
    });

    var initialId = location.hash.replace("#", "") || notes[0].id;
    showNote(initialId);
  }

  document.addEventListener("DOMContentLoaded", initEntrySwitcher);
})();
