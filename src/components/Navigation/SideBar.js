import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

import {
  SideBarIconBox,
  SideBarContainer,
  SideBarIcon,
  SideBarText,
} from "../../styles/styledComponents/nav/SideBar.sc";
import contentEditVioletIcon from "../../styles/assets/icons/sideBar/content-edit-violet.svg";
import contentEditWhiteIcon from "../../styles/assets/icons/sideBar/content-edit-white.svg";
import profileVioletIcon from "../../styles/assets/icons/sideBar/profile-violet.svg";
import profileWhiteIcon from "../../styles/assets/icons/sideBar/profile-white.svg";
import { setActivePage } from "../../helper/sideBarHelper";

const SideBar = ({ position }) => {
  const [isActiveContent, setIsActiveContent] = useState(false);
  const [isActiveProfile, setIsActiveProfile] = useState(false);

  const history = useHistory();
  const currentPage = history.location.pathname;

  useEffect(() => {
    setActivePage(currentPage, setIsActiveContent, setIsActiveProfile);
  }, [currentPage]);

  return (
    <SideBarContainer position={position}>
      <SideBarIconBox
        active={isActiveContent}
        top
        onClick={() => {
          if (!isActiveContent) {
            history.push(`/dashboard`);
          }
        }}
      >
        <SideBarIcon
          alt="Content Edit Icon"
          src={isActiveContent ? contentEditVioletIcon : contentEditWhiteIcon}
        />
        <SideBarText>Contents</SideBarText>
      </SideBarIconBox>
      <SideBarIconBox
        bottom
        active={isActiveProfile}
        onClick={() => {
          if (!isActiveProfile) {
            history.push(`/profile`);
          }
        }}
      >
        <SideBarIcon
          alt="Profile Icon"
          src={isActiveProfile ? profileVioletIcon : profileWhiteIcon}
        />
        <SideBarText>Profile</SideBarText>
      </SideBarIconBox>
    </SideBarContainer>
  );
};

SideBar.defaultProps = {
  position: undefined,
};

SideBar.propTypes = {
  position: PropTypes.string,
};

export default SideBar;
