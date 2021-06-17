import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import PageContainer from "../styles/styledComponents/global/PageContainer.sc";
import {
  Container404,
  Text404,
  Title404,
} from "../styles/styledComponents/global/404.sc";
import Button from "../styles/styledComponents/global/Buttons/Buttons.sc";

const Error404 = () => {
  const history = useHistory();

  useEffect(() => {
    setTimeout(() => {
      history.push("/");
    }, 2000);
  }, []);
  return (
    <PageContainer position="absolute">
      <Container404>
        <Title404>404 Error :(</Title404>
        <Text404>this page does not exist.</Text404>
        <Button onClick={() => history.push("/")}> Go Home </Button>
      </Container404>
    </PageContainer>
  );
};

export default Error404;
