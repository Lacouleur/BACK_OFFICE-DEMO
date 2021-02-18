import { verifySlug } from "../auth/verifyFields";

function fieldDispatcher(
  setEditCategory,
  setError,
  setSpecialError,
  setValues,
  section,
  setPostingError,
  values,
  name,
  e
) {
  const { seo } = values;

  switch (section) {
    case "seo":
      if (name === "title" && e.target.value.length > 0) {
        setValues({
          ...values,
          seo: {
            ...seo,
            [name]: e.target.value,
          },
        });
      } else if (name === "description" && e.target.value.length > 0) {
        setValues({
          ...values,
          seo: {
            ...seo,
            [name]: e.target.value,
          },
        });
      } else {
        delete seo[name];
        setValues({
          ...values,
        });
      }

      if (seo && Object.keys(seo).length === 0) {
        const newValues = { ...values };
        delete newValues.seo;
        setValues({
          ...newValues,
        });
      }

      break;

    case "main":
      if ((name === "title" || name === "slug") && e.target.value.length > 0) {
        setError(false);
      }

      if (name === "slug") {
        if (e.target.value.length > 0) {
          setPostingError({
            isError: false,
            text: "",
          });
        }

        if (verifySlug(e.target.value)) {
          setSpecialError(false);
          setValues({
            ...values,
            [name]: e.target.value,
          });
        } else if (e.target.value.length > 0 && !verifySlug(e.target.value)) {
          setSpecialError(true);
        } else {
          setValues({
            ...values,
            [name]: e.target.value,
          });
          setSpecialError(false);
        }
      } else if (name === "htag") {
        setValues({
          ...values,
          header: { [name]: e.target.value },
        });
      } else if (name === "category") {
        if (e?.value) {
          setEditCategory(e);
          setValues({
            ...values,
            [name]: e.value,
          });
        } else {
          setEditCategory("");
          const vals = { ...values };
          delete vals[name];
          setValues({ ...vals });
        }
      } else {
        setValues({
          ...values,
          [name]: e.target.value,
        });
      }

      break;

    case "textEditor":
      setValues({
        ...values,
        component: [{ type: "text", text: `${e.target.innerHTML}` }],
      });

      break;

    default:
  }
}

export default fieldDispatcher;
