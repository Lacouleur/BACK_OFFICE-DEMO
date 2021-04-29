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
    entityToHTML: (entity, originalText) => {
      if (entity.type === "LINK") {
        return (
          <a
            href={entity.data.url}
            target={entity.data.targetOption}
            rel="noreferrer"
          >
            {originalText}
          </a>
        );
      }
      return originalText;
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
        return createEntity("LINK", "MUTABLE", {
          url: node.href,
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
