import React from "react";
import PropTypes from "prop-types";
import FooterContainer from "../styles/styledComponents/nav/Footer.sc";

const Footer = ({ position }) => {
  return <FooterContainer position={position} />;
};

Footer.defaultProps = {
  position: undefined,
};

Footer.propTypes = {
  position: PropTypes.string,
};

export default Footer;
