import { css } from "styled-components";

const breakpoints = {
  mobile: "425px",
  tablet: "768px",
  desktopM: "1440px",
  desktopL: "2560px",
};

const devices = {
  mobile: `(max-width: ${breakpoints.mobile})`,
  tablet: `(max-width: ${breakpoints.tablet})`,
  desktopM: `(max-width: ${breakpoints.desktopM})`,
  desktopL: `(max-width: ${breakpoints.desktopL})`,
};

const media = {
  mobile: (...args) =>
    css`
      @media ${devices.mobile} {
        ${css(...args)}
      }
    `,
  tablet: (...args) =>
    css`
      @media ${devices.tablet} {
        ${css(...args)}
      }
    `,
  desktopM: (...args) =>
    css`
      @media ${devices.desktopM} {
        ${css(...args)}
      }
    `,
  desktopL: (...args) =>
    css`
      @media ${devices.desktopL} {
        ${css(...args)}
      }
    `,
};

export default media;
