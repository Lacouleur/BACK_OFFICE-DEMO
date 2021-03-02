export const ADD_SEO_DESCRIPTION = "ADD_SEO_DESCRIPTION";
export const ADD_SEO_TITLE = "ADD_SEO_TITLE";

export const addSeoTitle = (payload) => ({
  type: ADD_SEO_TITLE,
  payload,
});

export const addSeoDescription = (payload) => ({
  type: ADD_SEO_DESCRIPTION,
  payload,
});
