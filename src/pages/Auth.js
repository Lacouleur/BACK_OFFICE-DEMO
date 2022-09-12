import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import idIcon from "../styles/assets/icons/id.svg";
import lockIcon from "../styles/assets/icons/lock.svg";
import AuthField from "../components/Auth/AuthField";
import { Form, AuthBox } from "../styles/styledComponents/auth/Auth.sc";
import Header from "../components/Navigation/Header";
import Footer from "../components/Navigation/Footer";
import {
  FormTitle,
  GreenText,
  H1,
  H2,
  MainTitleBox,
} from "../styles/styledComponents/global/Titles.sc";
import Button from "../styles/styledComponents/global/Buttons/Buttons.sc";
import PageContainer from "../styles/styledComponents/global/PageContainer.sc";
import errorIcon from "../styles/assets/icons/exclamation.svg";
import { logUser } from "../store/actions/thunk/ActionBarActions.thunk";
import { getRefreshToken, getToken } from "../services/client/tokenStuff";
import { consolePage } from "../helper/consoleStyles";
import {
  ErrorNotification,
  ErrorNotificationIcon,
  ErrorNotificationText,
} from "../styles/styledComponents/global/Errors.sc";

// Simple authentication system for the BO

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
    console.log("%cPAGE: AUTH", `${consolePage}`);
    if (getToken() && getRefreshToken()) {
      history.push("/dashboard");
    }
  }, []);

  return (
    <>
      <PageContainer position="absolute">
        <Header />
        <AuthBox>
          <MainTitleBox authTitle>
            <H1>NOWU&apos;S BACK OFFICE</H1>
            <H2>
              Welcome to NOWU the
              <GreenText> green </GreenText>
              media
            </H2>
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
              loginButtonClickable={!mailFieldError && !passwordFieldError}
              loginButtonUnClickable={mailFieldError || passwordFieldError}
              type={!mailFieldError && !passwordFieldError ? "submit" : "text"}
            >
              Login
            </Button>
          </Form>
          {authError && (
            <ErrorNotification>
              <ErrorNotificationIcon src={errorIcon} />
              <ErrorNotificationText>
                Incorrect username and/or password. Please check and try again.
              </ErrorNotificationText>
            </ErrorNotification>
          )}
        </AuthBox>
        <Footer />
      </PageContainer>
    </>
  );
};

export default Auth;
