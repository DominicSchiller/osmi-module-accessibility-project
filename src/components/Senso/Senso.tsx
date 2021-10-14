import React, {Component} from "react";
import './Senso.scss'
import {ColorButton, ColorButtonProps} from "./ColorButton/ColorButton";

const colorButtons: ColorButtonProps[] = [
    { id: 1, alignment: 'top-left' },
    { id: 2, alignment: 'top-right' },
    { id: 3, alignment: 'bottom-left' },
    { id: 4, alignment: 'bottom-right' }
];

export class Senso extends Component {
    render() {
        return <div className="Senso">
            { colorButtons.map(actionKey =>
                <ColorButton
                    key={actionKey.id}
                    id={actionKey.id}
                    alignment={actionKey.alignment} />
            )}
            <div className="innerHole"/>
        </div>
    }
}