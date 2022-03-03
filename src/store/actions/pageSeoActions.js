import { PAGE_SET_SEO_TITLE, PAGE_SET_SEO_DESCRIPTION } from "../constants";

export const pageSetSeoTitle = (payload) => ({
  type: PAGE_SET_SEO_TITLE,
  payload,
});

export const pageSetSeoDescription = (payload) => ({
  type: PAGE_SET_SEO_DESCRIPTION,
  payload,
});
