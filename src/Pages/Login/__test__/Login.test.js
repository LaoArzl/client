import React from "react";
import ReactDOM from "react-dom";
import Login from "../Login";

import {render} from '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';

it("Test this component", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Login />, div);
});

