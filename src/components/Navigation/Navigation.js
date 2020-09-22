import React from "react";

import styled from '@emotion/styled'

const NavContainer = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: lightgray;
  margin-bottom: 10px;

  & > div {
    padding-left: 10px;
    padding-right: 10px;
  }

  & > ul {
    display: flex;
    flex-direction: row;
    margin: 0;
    padding: 0;

    & > li {
      width: 200px;
      text-align: center;
      line-height: 50px;
      list-style: none;
      cursor: pointer;
    }

    & > li:hover {
     background-color: darkgrey
    }
  }




 
`

export default function NavigationBar({ onNavChange }) {
  return (
    <NavContainer >
      <div>A FrontEnd Test</div>
      <ul>
        <li onClick={() => onNavChange("overview")}>Overview</li>
        <li onClick={() => onNavChange("campaigns")}>Campaigns</li>
        <li onClick={() => onNavChange("create")}>Create</li>
      </ul>
    </NavContainer>
  );
}
