import React from "react";

export const withNoEmptyObject = (maybeEmptyObjectProp) => (Component) => (
  props
) => {
  if (Object.keys(props[maybeEmptyObjectProp]).length === 0)
    return `${maybeEmptyObjectProp} is empty`;
  else return <Component {...props} />;
};

export const withNoNull = (maybeNullProp) => (Component) => (props) => {
  return props[maybeNullProp] === null ? null : <Component {...props} />;
};

export const withHeader = (name) => (Component) => (props) => {
  return (
    <section>
      <h3>{name}</h3>
      <Component {...props} />
    </section>
  );
};
