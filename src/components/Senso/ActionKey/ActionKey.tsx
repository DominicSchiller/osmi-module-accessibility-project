import React, {Component} from "react";
import './ActionKey.scss'

export type ActionKeyProps = {
    id: number,
    alignment: string
}

export class ActionKey extends Component<ActionKeyProps> {
    constructor(props: ActionKeyProps) {
        super(props);
    }
    render() {
        return <div className={`ActionKey ${this.props.alignment}`}>
        </div>
    }
}