import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import idIcon from "../styles/assets/icons/id.svg";
import lockIcon from "../styles/assets/icons/lock.svg";
import AuthField from "../components/Auth/AuthField";
import { Form, AuthBox } from "../styles/styledComponents/auth/Auth.sc";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  FormTitle,
  H1,
  H2,
  MainTitleBox,
} from "../styles/styledComponents/global/Titles.sc";
import Button from "../styles/styledComponents/global/Buttons/Buttons.sc";
import { loginButton } from "../styles/styledComponents/global/Buttons/CustomButtons.sc";
import PageContainer from "../styles/styledComponents/global/PageContainer.sc";
import Error from "../components/Notifications/Error";
import { logUser } from "../store/actions/clientActions";
import { getToken } from "../services/client/authClient";

const Auth = () => {
  const authState = useSelector(({ authReducer }) => authReducer);
  const { mailFieldError, passwordFieldError, authError } = authState;
  const dispatch = useDispatch();
  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    const redirectTo = (link) => {
      history.push(link);
    };
    dispatch(logUser(redirectTo));
  };

  useEffect(() => {
    if (getToken()) {
      history.push("dashboard");
    }
  }, []);

  return (
    <>
      <PageContainer position="absolute">
        <Header />
        <AuthBox>
          {authError && (
            <Error
              text="Incorrect username and/or password. Please check and try again."
              styles={{
                margin: "36px 0 0 0",
              }}
            />
          )}
          <MainTitleBox>
            <H1>PHOENIX&apos;S BACK OFFICE</H1>
            <H2>Welcome to Phoenix Media&apos;s Backoffice</H2>
          </MainTitleBox>

          <Form onSubmit={(e) => handleSubmit(e)} autocomplete="on">
            <FormTitle>Log in</FormTitle>

            <AuthField
              icon={idIcon}
              eye={false}
              type="mail"
              placeholder="ID"
              status={mailFieldError}
            />

            <AuthField
              icon={lockIcon}
              eye
              type="password"
              placeholder="password"
              status={passwordFieldError}
            />

            <Button
              styles={
                !mailFieldError && !passwordFieldError
                  ? loginButton.clickable
                  : loginButton.unClickable
              }
              type={!mailFieldError && !passwordFieldError ? "submit" : "text"}
            >
              Login
            </Button>
          </Form>
        </AuthBox>
        <Footer />
      </PageContainer>
    </>
  );
};

export default Auth;
