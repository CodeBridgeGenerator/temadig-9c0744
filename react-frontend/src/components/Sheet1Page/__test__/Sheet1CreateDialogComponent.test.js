import React from "react";
import { render, screen } from "@testing-library/react";

import Sheet1CreateDialogComponent from "../Sheet1CreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders sheet1 create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <Sheet1CreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("sheet1-create-dialog-component")).toBeInTheDocument();
});
