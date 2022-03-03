import { PAGE_ADD_SEO_TITLE, PAGE_ADD_SEO_DESCRIPTION } from "../constants";

export const addSeoTitle = (payload) => ({
  type: PAGE_ADD_SEO_TITLE,
  payload,
});

export const addSeoDescription = (payload) => ({
  type: PAGE_ADD_SEO_DESCRIPTION,
  payload,
});
