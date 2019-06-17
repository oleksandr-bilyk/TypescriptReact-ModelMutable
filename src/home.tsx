import React from 'react';
import * as ApplicationViewModel from './ViewModel/ApplicationViewModel';

function Hello() {
    return React.createElement(
        "ul",
        null,
        React.createElement(
            "li",
            null,
            "Item 1"
        ),
        React.createElement(
            "li",
            null,
            "Item 2"
        ),
        React.createElement(
            "li",
            null,
            "Item 3"
        ),
        React.createElement(
            "li",
            null,
            "Item 4"
        )
    )
}

export default Hello
