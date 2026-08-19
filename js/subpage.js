(function () {
  "use strict";

  function initEntryScrollSpy() {
    var entryLinks = document.querySelectorAll(".side-nav-entries a");
    if (!entryLinks.length) return;

    var linkById = {};
    entryLinks.forEach(function (link) {
      var id = link.getAttribute("href").replace("#", "");
      linkById[id] = link;
    });

    var notes = document.querySelectorAll("article.note[id]");
    if (!notes.length) return;

    function setActive(id) {
      entryLinks.forEach(function (link) {
        link.classList.remove("is-active");
      });
      if (linkById[id]) {
        linkById[id].classList.add("is-active");
      }
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );

    notes.forEach(function (note) {
      observer.observe(note);
    });

    setActive(notes[0].id);
  }

  document.addEventListener("DOMContentLoaded", initEntryScrollSpy);
})();
