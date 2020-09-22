import React, { useState, Fragment } from "react";

import { withHeader } from "./hocs";

export default function Create({ dispatch }) {
  const [textValue, setTextValue] = useState("");
  return (
    <Fragment>
      <input
        value={textValue}
        onChange={(event) => setTextValue(event.target.value)}
      />
      <button
        onClick={() => {
          dispatch({
            type: "createCampaign",
            payload: {
              name: textValue,
              // TODO: grab data from the API here
              installData: [],
            },
          });
          setTextValue("");
        }}
      >
        Create Campaign
      </button>
    </Fragment>
  );
}

export const CreateWithHeader = withHeader("Create")(Create);
