import React from "react";
import { convertToHTML, convertFromHTML } from "draft-convert";

function HTMLconverter(editorState, mode = "to", data = "") {
  const toHtmlOptions = {
    styleToHTML: (style) => {
      if (style === "STRIKETHROUGH") {
        return <mark />;
      }
      if (style === "ITALIC") {
        return <i />;
      }
      if (style === "BOLD") {
        return <b />;
      }
      return null;
    },
    blockToHTML: (block) => {
      if (block.type === "blockquote") {
        return {
          start: "<blockquote><span>",
          end: "</span></blockquote>",
        };
      }
      return null;
    },
    entityToHTML: (entity) => {
      if (entity.type === "LINK") {
        return {
          start: `<a href="${entity.data.url}" target="${entity.data.targetOption}" rel="noreferrer">`,
          end: "</a>",
        };
      }
      return null;
    },
  };

  const fromHtmlOptions = {
    htmlToStyle: (nodeName, node, currentStyle) => {
      if (nodeName === "mark") {
        return currentStyle.add("STRIKETHROUGH");
      }
      return currentStyle;
    },
    htmlToEntity: (nodeName, node, createEntity) => {
      if (nodeName === "a") {
        // We use node.pathname instead of .href (as mentioned in the doc) because of an issue from the lib. This issue append "HOST_URL" to the href. please check regularly if problem is solved : https://github.com/facebook/draft-js/issues/2311
        // console.log("node.pathname", node.pathname.substring(1));
        // console.log("node.href", node.href);
        return createEntity("LINK", "MUTABLE", {
          url: node?.pathname?.substring(1),
          targetOption: node.target,
        });
      }

      return null;
    },
  };

  if (mode === "to") {
    const result = convertToHTML(toHtmlOptions)(
      editorState.getCurrentContent()
    );
    return result;
  }
  if (mode === "from") {
    const result = convertFromHTML(fromHtmlOptions)(data);
    return result;
  }
  return null;
}

export default HTMLconverter;
