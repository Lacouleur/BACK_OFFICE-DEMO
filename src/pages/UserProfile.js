import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PageContainer from "../styles/styledComponents/global/PageContainer.sc";
import Header from "../components/Navigation/Header";
import Footer from "../components/Navigation/Footer";
import SideBar from "../components/Navigation/SideBar";
import { getToken, parseJwt } from "../services/client/tokenStuff";
import {
  buildAvatarInfos,
  dispatchUserInfo,
  fieldsList,
  findSelectedUser,
  findSignature,
  listenToScroll,
} from "../helper/userHelper";
import {
  Form,
  FormContainer,
  RoundThumbnail,
  SectionBox,
  SectionTitle,
  Separator,
} from "../styles/styledComponents/editor/Sections.sc";
import {
  FormTitle,
  H1,
  TitleIcon,
} from "../styles/styledComponents/global/Titles.sc";
import userIcon from "../styles/assets/icons/sideBar/profile-white.svg";
import signIcon from "../styles/assets/icons/signature-white.svg";
import Field from "../components/Editor/Field";
import useClickOutside from "../helper/cutomHooks/useClickOutside";
import {
  ActionBarBox,
  SaveButton,
  UserActionBar,
  Selector,
} from "../styles/styledComponents/user/user.sc";

import { fetchUser, updateUser } from "../store/actions/thunk/UserAction.thunk";
import ErrorModal from "../components/Modals/ErrorModal";
import { consoleSucces } from "../helper/consoleStyles";
import { fetchUsers } from "../store/actions/thunk/ArticlesActions.thunk";
import { cleanUser } from "../store/actions/userActions";
import {
  cleanContentState,
  cleanPageState,
} from "../store/actions/commonsActions";

const UserProfile = () => {
  const userInfo = parseJwt(getToken());
  const dispatch = useDispatch();
  const userProfileSection = React.useRef(null);
  const pageTitle = React.useRef(null);
  const [showActionBar, setShowActionBar] = useState(false);
  const [avatarTitle, setAvatarTitle] = useState(undefined);
  const [isAvatarImage, setIsAvatarImage] = useState(undefined);
  const [selectedUser, setSelectedUser] = useState(null);
  const isAdmin = userInfo.role === "ADMINISTRATOR";

  const userProfileState = useSelector(({ userReducer }) => userReducer);

  const actionBarState = useSelector(
    ({ actionBarReducer }) => actionBarReducer
  );

  const mainInformationState = useSelector(
    ({ mainInformationReducer }) => mainInformationReducer
  );

  const { isOpenErrorModal } = actionBarState;
  const { usersList } = mainInformationState;

  const {
    userId,
    userIsChanged,
    picture,
    locale,
    displayedName,
    displayedNames,
    quote,
    quotes,
  } = userProfileState;

  const avatarUrl = picture?.urls?.thumbnail?.url;

  function onClickOutside() {
    if (userIsChanged) {
      dispatch(updateUser(selectedUser.value));
    }
  }

  useEffect(() => {
    console.log("%cUser infos =>", `${consoleSucces}`, userInfo);
    dispatch(cleanPageState());
    dispatch(cleanContentState());
    dispatchUserInfo(dispatch, userInfo);
    dispatch(fetchUsers());
    window.addEventListener("scroll", () => {
      listenToScroll(setShowActionBar);
    });

    return () => {
      // return a cleanup function to unregister our function since its gonna run multiple times
      window.removeEventListener("scroll", () => setShowActionBar(false));
    };
  }, []);

  useEffect(() => {
    findSelectedUser(usersList, userInfo, setSelectedUser);
  }, [usersList]);

  useClickOutside(userProfileSection, onClickOutside);

  useEffect(() => {
    buildAvatarInfos(picture, setAvatarTitle, setIsAvatarImage);
  }, [userIsChanged, picture?.uuid]);

  useEffect(() => {
    if (picture?.uuid) {
      setAvatarTitle(picture?.uuid.split("/")[1]);
      setIsAvatarImage(true);
    }
  }, [userIsChanged, picture?.uuid]);

  return (
    <PageContainer position="relative">
      <Header position="fixed" />
      <SideBar userIsChanged={userIsChanged} userInfo={userInfo.sub} />
      {isOpenErrorModal && <ErrorModal />}
      <Form>
        <UserActionBar show={showActionBar}>
          <ActionBarBox>
            <H1 ref={pageTitle}> PROFILE AND SIGNATURE </H1>
            <SaveButton type="button" disabled={!userIsChanged}>
              {userIsChanged ? "save" : "saved"}
            </SaveButton>
            {isAdmin && selectedUser && (
              <Selector
                classNamePrefix="select"
                className="selector"
                value={selectedUser}
                defaultValue={selectedUser}
                options={usersList}
                isClerable={false}
                onChange={(event) => {
                  dispatch(cleanUser());
                  setSelectedUser(event);
                  dispatch(fetchUser(event.value));
                }}
              />
            )}
          </ActionBarBox>
        </UserActionBar>
        <FormContainer userPage>
          <SectionBox noWrap ref={userProfileSection}>
            <SectionTitle>
              <TitleIcon src={userIcon} />
              <FormTitle>PROFILE</FormTitle>
            </SectionTitle>
            {avatarUrl && isAvatarImage && (
              <RoundThumbnail avatar src={avatarUrl} />
            )}
            {fieldsList.map((field) => {
              switch (field.type) {
                case "text": {
                  if (field.section === "identity") {
                    return (
                      <Field
                        key={`${field.name}-${field.type}-${field.placeholder}-${userId}`}
                        name={field.name}
                        placeholder={field.placeholder}
                        section="userProfile"
                        maxlength={field.max}
                        infos={`Maximum ${field.max} characters`}
                        edit={userProfileState[field.name]}
                      />
                    );
                  }
                  break;
                }

                case "image": {
                  return (
                    <Field
                      name={field.name}
                      key={`${field.name}-${field.type}-${field.placeholder}-${userId}`}
                      fieldType="uploader"
                      placeholder={field.placeholder}
                      section="userProfile"
                      infos="Image size: 320x456 / 320x320 / 320x180 - 100ko maximum"
                      edit={avatarTitle || undefined}
                    />
                  );
                }

                default:
                  return null;
              }
              return null;
            })}
          </SectionBox>
          <Separator />
          <SectionBox noWrap>
            <SectionTitle>
              <TitleIcon src={signIcon} />
              <FormTitle>FRENCH SIGNATURE</FormTitle>
            </SectionTitle>
            {fieldsList.map((field) => {
              if (field?.lang === "fr") {
                return (
                  <Field
                    key={`${field.name}-${field.type}-${field.placeholder}-${userId}`}
                    name={field.name}
                    placeholder={field.placeholder}
                    section="userProfile"
                    maxlength={field.max}
                    infos={
                      field.max ? `Maximum ${field.max} characters` : undefined
                    }
                    edit={findSignature(
                      field.name,
                      locale,
                      quote,
                      displayedName,
                      quotes,
                      displayedNames
                    )}
                    lang={field.lang}
                  />
                );
              }
              return null;
            })}
          </SectionBox>
          <SectionBox noWrap>
            <SectionTitle>
              <TitleIcon src={signIcon} />
              <FormTitle>GERMAN SIGNATURE</FormTitle>
            </SectionTitle>
            {fieldsList.map((field) => {
              if (field?.lang === "de") {
                return (
                  <Field
                    key={`${field.name}-${field.type}-${field.placeholder}-${userId}`}
                    name={field.name}
                    placeholder={field.placeholder}
                    section="userProfile"
                    maxlength={field.max}
                    infos={
                      field.max ? `Maximum ${field.max} characters` : undefined
                    }
                    edit={findSignature(
                      field.name,
                      locale,
                      quote,
                      displayedName,
                      quotes,
                      displayedNames
                    )}
                    lang={field.lang}
                  />
                );
              }
              return null;
            })}
          </SectionBox>
        </FormContainer>
      </Form>
      {/* <Footer position="fixed" /> */}
    </PageContainer>
  );
};

export default UserProfile;
