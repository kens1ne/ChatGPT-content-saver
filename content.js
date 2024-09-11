const saveArticleContent = (article) => {
  const content = article.innerText;

  if (content.includes('This content may violate our usage policies')) {
    return;
  }

  chrome.storage.local.get({articles: []}, (result) => {
    const articles = result.articles;

    if (!articles.includes(content)) {
      articles.push(content);
      chrome.storage.local.set({articles});
    }
  });
};

const observeArticle = (article) => {
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.type === 'childList' || mutation.type === 'characterData') {
        saveArticleContent(article);
      }
    });
  });

  const config = { childList: true, subtree: true, characterData: true };
  observer.observe(article, config);
};

const targetNode = document.body;
const observer = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    mutation.addedNodes.forEach(node => {
      if (node.nodeName === 'ARTICLE') {
        observeArticle(node);
      } else if (node.querySelectorAll) {
        node.querySelectorAll('article').forEach(article => observeArticle(article));
      }
    });
  });
});

const config = { childList: true, subtree: true };
observer.observe(targetNode, config);
