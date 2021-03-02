import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import PageContainer from "../styles/styledComponents/global/PageContainer.sc";
import HomeScreen from "../components/Editor/Sections/HomeScreen";
import Seo from "../components/Editor/Sections/Seo";
import PageTitle from "../components/PageTitle";
import Button from "../styles/styledComponents/global/Buttons/Buttons.sc";
import plus from "../styles/assets/icons/plus.svg";
import { createNewContent } from "../styles/styledComponents/global/Buttons/CustomButtons.sc";
import { IconCreat } from "../styles/styledComponents/contentList/ContentList.sc";
import {
  Form,
  FormContainer,
} from "../styles/styledComponents/editor/Sections.sc";
import EditorErrors from "../components/Editor/EditorErrors";
import ActionBar from "../components/Editor/actionBar/ActionBar";
import ModuleCreator from "../components/Editor/Sections/Modules/ModuleCreator";
import { checkAndSend, fetchContent } from "../store/actions/clientActions";

const Editor = () => {
  const dispatch = useDispatch();
  const [newModule, setNewModule] = useState(false);

  const homeScreenState = useSelector(
    ({ homeScreenReducer }) => homeScreenReducer
  );

  const { isEditing } = homeScreenState;
  const location = useLocation();

  function handleSubmit(e) {
    e.preventDefault();
    if (!isEditing) {
      dispatch(checkAndSend());
    } else {
      dispatch(checkAndSend("update", location.state.id));
    }
  }
  useEffect(() => {
    if (location.state?.id) {
      dispatch(fetchContent(location.state.id));
    }
  }, []);

  return (
    <PageContainer position="relative">
      <Header position="fixed" />
      <Form onSubmit={handleSubmit}>
        <ActionBar />
        <PageTitle />
        <EditorErrors />
        <FormContainer>
          <HomeScreen />
          <Seo />

          {newModule && <ModuleCreator editorStatus={setNewModule} />}
        </FormContainer>
      </Form>
      <Button
        onClick={() => setNewModule(true)}
        styles={{
          ...createNewContent,
          alignSelf: "flex-end",
          marginRight: "5%",
        }}
      >
        <IconCreat src={plus} />
        ADD A NEW BLOCK
      </Button>
      <Footer />
    </PageContainer>
  );
};

export default Editor;
