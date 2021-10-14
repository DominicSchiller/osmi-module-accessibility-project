import React, {Component} from "react";
import './ColorButton.scss'

export type ColorButtonProps = {
    id: number,
    alignment: string
}

export class ColorButton extends Component<ColorButtonProps> {
    constructor(props: ColorButtonProps) {
        super(props);
    }
    render() {
        return <div className={`ColorButton ${this.props.alignment}`}>
        </div>
    }
}