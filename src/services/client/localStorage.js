export function setArticleToEdit(articleId) {
  localStorage.setItem("ArticleToEdit", articleId);
}

export function getArticleToEdit() {
  const article = localStorage.getItem("ArticleToEdit");
  return article;
}

export function deleteArticleToEdit() {
  localStorage.removeItem("ArticleToEdit");
}
