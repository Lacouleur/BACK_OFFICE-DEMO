import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import Field from "../../Field";
import {
  FieldAndSwitchContainer,
  SwitchBox,
  SwitchLabel,
  Switch,
} from "../../../../styles/styledComponents/editor/modules/Modules.sc";
import { setPageModuleHeaderNewTab } from "../../../../store/actions/moduleActions";

const HeaderSectionPage = ({
  uuid,
  title,
  subtitle,
  url,
  openNewTabHeader,
}) => {
  const dispatch = useDispatch();

  return (
    <>
      <Field
        placeholder="Section Title"
        name="title"
        section="sectionHeader"
        moduleId={uuid}
        edit={title || ""}
      />

      <Field
        placeholder="Section Subtitle"
        name="subtitle"
        section="sectionHeader"
        fieldType="textarea"
        moduleId={uuid}
        edit={subtitle || ""}
      />

      <FieldAndSwitchContainer>
        <Field
          placeholder="Header Link"
          name="url"
          section="sectionHeader"
          moduleId={uuid}
          edit={url || ""}
        />
        <SwitchBox
          htmlFor={`switch-${uuid}`}
          onChange={() => {
            dispatch(
              setPageModuleHeaderNewTab({
                id: uuid,
                value: !openNewTabHeader,
              })
            );
          }}
        >
          <p>Open in new window</p>
          <Switch
            className="Switch"
            id={`switch-${uuid}`}
            type="checkbox"
            checked={openNewTabHeader}
            readOnly
          />
          <SwitchLabel className="SwitchLabel" htmlFor={`switch-${uuid}`} />
        </SwitchBox>
      </FieldAndSwitchContainer>
    </>
  );
};

HeaderSectionPage.defaultProps = {
  url: undefined,
  openNewTabHeader: undefined,
};

HeaderSectionPage.propTypes = {
  uuid: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  url: PropTypes.string,
  openNewTabHeader: PropTypes.bool,
};

export default HeaderSectionPage;