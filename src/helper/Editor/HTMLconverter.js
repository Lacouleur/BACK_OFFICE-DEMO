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
        // This object structure is important to avoid this text éditor to replace ' by html entities in links. If you modify this, please check links in editor before. ex: I'm a link.

        return {
          start: `<a href="${entity.data.url.replace(/\/$/, "")}" target="${
            entity.data.targetOption
          }" rel="noreferrer">`,
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
        const href =
          node.pathname === "/" ? node.href.replace(/\/$/, "") : node.href;

        return createEntity("LINK", "IMMUTABLE", {
          url: `${href}`,
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
