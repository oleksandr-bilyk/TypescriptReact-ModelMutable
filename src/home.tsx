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
  
    return (
        <ul className="list">
            <li>Item 1</li>
            <li>Item 1</li>
        </ul>
    );
}

export default Hello
