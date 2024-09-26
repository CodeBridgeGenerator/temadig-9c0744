import React from "react";
import { render, screen } from "@testing-library/react";

import Sheet1EditDialogComponent from "../Sheet1EditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders sheet1 edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <Sheet1EditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("sheet1-edit-dialog-component")).toBeInTheDocument();
});
