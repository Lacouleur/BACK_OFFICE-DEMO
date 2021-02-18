/* eslint-disable import/prefer-default-export */
import styled from "styled-components";
import colors from "../../../core/colors";

export const CKWraper = styled.div`
  &&& .jodit {
    &-wysiwyg {
      background-color: ${colors.darkGrey};
    }

    &-container:not(.jodit_inline) {
    }

    &-icon {
      fill: ${colors.paleViolet};
    }

    &-toolbar {
      &-button__trigger {
        svg {
          fill: ${colors.paleViolet};
        }
      }
      &__box {
        background-color: ${colors.mediumGrey};
      }
    }

    &-status-bar__item {
      color: ${colors.mediumGrey};
    }
  }
`;
