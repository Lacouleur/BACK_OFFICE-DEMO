import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { sendAuth, setToken, getToken } from "../services/client/authClient";
import idIcon from "../styles/assets/icons/id.svg";
import lockIcon from "../styles/assets/icons/lock.svg";
import errorIcon from "../styles/assets/icons/exclamation.svg";
import Field from "../components/Fields";
import {
  Form,
  FormTitle,
  MainTitleBox,
  ErrorNotification,
  ErrorNotificationText,
  ErrorNotificationIcon,
} from "../styles/styledComponents/auth/Auth.sc";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { H1, H2 } from "../styles/styledComponents/global/Titles.sc";
import Button from "../styles/styledComponents/global/Buttons.sc";
import { loginButton } from "../styles/styledComponents/global/customs/CustomButtons.sc";
import PageContainer from "../styles/styledComponents/global/PageContainer.sc";

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
    <PageContainer height="100%">
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
        <H1>PHOENIX&apos;S BACK OFFICE</H1>
        <H2>Welcome to Phoenix Media&apos;s Backoffice</H2>
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

        <Button
          style={
            mail !== "" && pass !== "" && mail !== "unvalid"
              ? loginButton.clickable
              : loginButton.unClickable
          }
          type={
            mail !== "" && pass !== "" && mail !== "unvalid" ? "submit" : "text"
          }
        >
          Login
        </Button>
      </Form>
      <Footer />
    </PageContainer>
  );
};

export default Auth;
