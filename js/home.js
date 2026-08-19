(function () {
  "use strict";

  function initNavToggle() {
    var toggle = document.getElementById("navToggle");
    var links = document.getElementById("navLinks");
    if (!toggle || !links) return;

    toggle.addEventListener("click", function () {
      var isOpen = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    links.addEventListener("click", function (event) {
      if (event.target.tagName === "A") {
        links.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  function buildKnowledgeHref(id) {
    return "/knowledge/?item=" + encodeURIComponent(id || "");
  }

  function renderTopics(items) {
    var grid = document.getElementById("topicGrid");
    if (!grid) return;

    grid.innerHTML = items
      .map(function (topic) {
        return (
          '<a class="topic-card knowledge-card" href="' + buildKnowledgeHref(topic.id || "") + '">' +
          '<div class="topic-card-head">' +
          "<strong>" + escapeHtml(topic.title || topic.name || "") + "</strong>" +
          '<span class="topic-type">' + escapeHtml(topic.category || topic.type || "") + "</span>" +
          "</div>" +
          '<p class="topic-note">' + escapeHtml(topic.summary || topic.note || "") + "</p>" +
          "</a>"
        );
      })
      .join("");
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function initKnowledgeTopics() {
    var grid = document.getElementById("topicGrid");
    if (!grid) return;

    fetch("/data/knowledge-public.json")
      .then(function (response) {
        if (!response.ok) throw new Error("Failed to load knowledge data");
        return response.json();
      })
      .then(function (data) {
        var items = Array.isArray(data.featured) ? data.featured.slice() : [];
        if (!items.length) {
          items = Array.isArray(data.topics) ? data.topics.slice(0, 6) : [];
          items = items.map(function (topic) {
            return {
              id: topic.id,
              title: topic.name,
              category: topic.type,
              summary: topic.note,
            };
          });
        }
        if (!items.length) {
          grid.innerHTML = '<p class="topic-status">暂无主题数据。</p>';
          return;
        }
        renderTopics(items);
      })
      .catch(function () {
        grid.innerHTML = '<p class="topic-status">主题数据加载失败，请稍后重试或直接前往 <a href="/knowledge/">知识地图</a>。</p>';
      });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initNavToggle();
    initKnowledgeTopics();
  });
})();
