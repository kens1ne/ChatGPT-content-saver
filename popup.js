document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.local.get({articles: []}, (result) => {
    const articlesDiv = document.getElementById('articles');
    result.articles.forEach(article => {
      const div = document.createElement('div');
      div.className = 'article';
      div.textContent = article;
      articlesDiv.appendChild(div);
    });
  });
});
