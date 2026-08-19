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

  function renderTopics(topics) {
    var grid = document.getElementById("topicGrid");
    if (!grid) return;

    var maxWeight = topics.reduce(function (max, topic) {
      return Math.max(max, topic.weight || 0);
    }, 1);

    grid.innerHTML = topics
      .map(function (topic) {
        var fill = Math.max(6, Math.round(((topic.weight || 0) / maxWeight) * 100));
        return (
          '<div class="topic-card">' +
          '<div class="topic-card-head">' +
          "<strong>" + escapeHtml(topic.name || "") + "</strong>" +
          '<span class="topic-type">' + escapeHtml(topic.type || "") + "</span>" +
          "</div>" +
          '<div class="topic-bar-track"><div class="topic-bar-fill" style="width:' + fill + '%"></div></div>' +
          '<p class="topic-note">' + escapeHtml(topic.note || "") + "</p>" +
          "</div>"
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
        var topics = Array.isArray(data.topics) ? data.topics.slice() : [];
        topics.sort(function (a, b) {
          return (b.weight || 0) - (a.weight || 0);
        });
        if (!topics.length) {
          grid.innerHTML = '<p class="topic-status">暂无主题数据。</p>';
          return;
        }
        renderTopics(topics);
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
