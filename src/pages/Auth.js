import React from "react";
import eyeIcon from "../styles/assets/icons/eye.svg";
import idIcon from "../styles/assets/icons/id.svg";
import lockIcon from "../styles/assets/icons/lock.svg";
import {
  Box,
  FormTitle,
  MainTitleBox,
  MainTitle,
  MainSubTitle,
  Field,
  FieldIcon,
  FieldContainer,
  ValidateButton,
} from "../styles/styledComponents/Auth/Auth";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Auth = () => {
  return (
    <>
      <Header />
      <MainTitleBox>
        <MainTitle>PHOENIX&apos;S BACK OFFICE</MainTitle>
        <MainSubTitle>Welcome to Phoenix Media&apos;s Backoffice</MainSubTitle>
      </MainTitleBox>
      <Box>
        <FormTitle>Log in</FormTitle>
        <FieldContainer>
          <FieldIcon src={idIcon} info="idIcon" />
          <FieldIcon src={eyeIcon} info="eyeIcon" />
          <Field type="text" name="ID" placeholder="ID" />
        </FieldContainer>
        <FieldContainer>
          <FieldIcon src={lockIcon} info="lockIcon" />
          <FieldIcon src={eyeIcon} info="eyeIcon" />
          <Field type="password" name="pwd" placeholder="Password" />
        </FieldContainer>
        <ValidateButton>Login</ValidateButton>
      </Box>
      <Footer />
    </>
  );
};

export default Auth;
