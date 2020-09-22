import React from "react";

import { withHeader } from "../../hocs/hocs";

export default function CreateCampaign({ clickHandler }) {
  const [textValue, setTextValue] = React.useState("");
  return (
    <>
      <input
        value={textValue}
        onChange={(event) => setTextValue(event.target.value)}
      />
      <button
        onClick={() => {
          clickHandler(textValue);
          setTextValue("");
        }}
      >
        Create Campaign
      </button>
    </>
  );
}

export const CreateCampaignView = withHeader("Create")(CreateCampaign);
