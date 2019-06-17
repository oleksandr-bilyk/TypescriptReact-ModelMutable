import React from 'react';
import * as ApplicationViewModel from './ViewModel/ApplicationViewModel';

let application = new ApplicationViewModel.ApplicationViewModel()

export interface Props {
    name: string;
    enthusiasmLevel?: number;
    onIncrement?: () => void;
    onDecrement?: () => void;
  }

function Hello() {
    let a = 5;
  
    // return (
    //     <ul className="list">
    //         <li>Item 1</li>
    //         <li>Item 1</li>
    //     </ul>
    // );

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
