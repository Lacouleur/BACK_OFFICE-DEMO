import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { sendAuth, setToken, getToken } from "../services/client/authclient";
import idIcon from "../styles/assets/icons/id.svg";
import lockIcon from "../styles/assets/icons/lock.svg";
import errorIcon from "../styles/assets/icons/exclamation.svg";
import colors from "../styles/core/colors";
import Field from "../components/Fields";
import {
  Form,
  FormTitle,
  MainTitleBox,
  MainTitle,
  MainSubTitle,
  ValidateButton,
  ErrorNotification,
  ErrorNotificationText,
  ErrorNotificationIcon,
} from "../styles/styledComponents/Auth/Auth";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Auth = () => {
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState();
  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email: mail,
      password: pass,
    };
    sendAuth(data)
      .then((token) => {
        if (token) {
          setToken(token.token);
        }
      })
      .then(() => {
        if (getToken()) {
          history.push("/dashboard");
        } else {
          setError(true);
        }
      });
  };

  return (
    <>
      <Header />
      {error && (
        <ErrorNotification>
          <ErrorNotificationIcon src={errorIcon} />
          <ErrorNotificationText>
            Incorrect username and/or password. Please check and try again.
          </ErrorNotificationText>
        </ErrorNotification>
      )}

      <MainTitleBox>
        <MainTitle>PHOENIX&apos;S BACK OFFICE</MainTitle>
        <MainSubTitle>Welcome to Phoenix Media&apos;s Backoffice</MainSubTitle>
      </MainTitleBox>

      <Form onSubmit={(e) => handleSubmit(e)} autocomplete="on">
        <FormTitle>Log in</FormTitle>
        <Field
          settings={{
            icon: idIcon,
            eye: false,
            type: "mail",
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
            placeholder: "password",
            setter: setPass,
            status: pass,
          }}
        />

        <ValidateButton
          style={
            mail !== "" && pass !== "" && mail !== "unvalid"
              ? {
                  fontColor: colors.black,
                  background: colors.paleViolet,
                  cursor: "pointer",
                }
              : {
                  fontColor: colors.mediumGrey,
                  background: colors.darkGrey,
                  cursor: "not-allowed",
                }
          }
          type={
            mail !== "" && pass !== "" && mail !== "unvalid" ? "submit" : "text"
          }
        >
          Login
        </ValidateButton>
      </Form>
      <Footer />
    </>
  );
};

export default Auth;
