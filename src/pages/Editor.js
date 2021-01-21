/* eslint-disable no-unused-vars */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from "react";
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
import { Form } from "../styles/styledComponents/editor/Sections.sc";
import { checkSlug, checkTitle } from "../helper/Editor/checkFields";
import EditorErrors from "../components/Editor/EditorErrors";
import { getContent, postContent } from "../services/client/contentClient";
import { getArticleToEdit } from "../services/client/localStorage";

const Editor = () => {
  const [values, setValues] = useState({});
  const [titleError, setTitleError] = useState(false);
  const [slugError, setSlugError] = useState(false);
  const [specialError, setSpecialError] = useState(false);
  const [posted, setPosted] = useState(false);
  const [postingError, setPostingError] = useState({
    isError: false,
    text: "",
  });

  const [articleToEdit, setArticleToEdit] = useState();

  useEffect(() => {
    async function fetchArticleToEdit() {
      const res = await getContent(getArticleToEdit());
      setArticleToEdit(res.data);
    }

    if (getArticleToEdit()) {
      fetchArticleToEdit();
    }
  }, []);

  /*   console.log(articleToEdit); */

  function checkAndSend(e) {
    e.preventDefault();
    const title = checkTitle(values);
    const slug = specialError ? true : checkSlug(values);

    setTitleError(title);
    setSlugError(slug);
    if (!title && !slug) {
      const form = e.target;
      postContent(
        values,
        setValues,
        form,
        setPosted,
        setSpecialError,
        setPostingError
      );
    }
  }

  return (
    <PageContainer position="relative">
      <Header />
      <PageTitle />
      <EditorErrors
        postingError={postingError}
        specialError={specialError}
        posted={posted}
        setPosted={setPosted}
        titleError={titleError}
        slugError={slugError}
      />
      <Form onSubmit={checkAndSend}>
        <HomeScreen
          values={values}
          setValues={setValues}
          specialError={specialError}
          posted={posted}
          setPosted={setPosted}
          setTitleError={setTitleError}
          titleError={titleError}
          setSlugError={setSlugError}
          slugError={slugError}
          setSpecialError={setSpecialError}
          setPostingError={setPostingError}
          postingError={postingError}
          edit={
            articleToEdit
              ? {
                  title: articleToEdit.title,
                  slug: articleToEdit.slug,
                  category: articleToEdit.category._id,
                }
              : undefined
          }
        />
        <Seo
          values={values}
          setValues={setValues}
          edit={
            articleToEdit
              ? {
                  title: articleToEdit.seo.title,
                  description: articleToEdit.seo.description,
                }
              : undefined
          }
        />
      </Form>
      <Button
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
