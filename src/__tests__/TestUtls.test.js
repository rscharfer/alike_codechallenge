import React, { useState, useEffect } from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

function User(props) {
  const [user, setUser] = useState(null);

  async function fetchUserData(id) {
    const response = await fetch("/" + id);
    setUser(await response.json());
  }

  useEffect(() => {
    fetchUserData(props.id);
  }, [props.id]);

  if (!user) return "...getting user info";

  return (
    <details>
      <summary>{user.name}</summary>
      <strong>{user.age}</strong> years old
      <br />
      lives in {user.address}
    </details>
  );
}

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test("", async () => {
  // arrange
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          name: "Ryan",
          age: "43",
          address: "Richardstrasse 62",
        }),
    })
  );

  await act(async () => {
    render(<User id="5" />, container);
  });

  expect(container.querySelector("summary").textContent).toBe("Ryan");
  expect(container.querySelector("strong").textContent).toBe("43");
  expect(container.querySelector("strong").textContent).toBe("43");
  expect(container.textContent).toContain("Richardstrasse 62");
});
