import React, { useState } from "react";
import idIcon from "../styles/assets/icons/id.svg";
import lockIcon from "../styles/assets/icons/lock.svg";
import colors from "../styles/core/colors";
import Field from "../components/Fields";
import {
  Box,
  FormTitle,
  MainTitleBox,
  MainTitle,
  MainSubTitle,
  ValidateButton,
} from "../styles/styledComponents/Auth/Auth";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Auth = () => {
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");

  return (
    <>
      <Header />
      <MainTitleBox>
        <MainTitle>PHOENIX&apos;S BACK OFFICE</MainTitle>
        <MainSubTitle>Welcome to Phoenix Media&apos;s Backoffice</MainSubTitle>
      </MainTitleBox>
      <Box>
        <FormTitle>Log in</FormTitle>
        <Field
          settings={{
            icon: idIcon,
            eye: false,
            type: "mail",
            name: "ID",
            placeholder: "ID",
            setter: setMail,
            status: mail,
          }}
        />
        <Field
          settings={{
            icon: lockIcon,
            eye: true,
            type: "password",
            name: "pwd",
            placeholder: "password",
            setter: setPass,
            status: pass,
          }}
        />
        <ValidateButton
          style={
            mail === "valid" && pass === "valid"
              ? { fontColor: colors.black, background: colors.paleViolet }
              : { fontColor: colors.mediumGrey, background: colors.darkGrey }
          }
        >
          Login
        </ValidateButton>
      </Box>
      <Footer />
    </>
  );
};

export default Auth;
