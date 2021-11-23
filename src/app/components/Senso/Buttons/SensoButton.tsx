import React from "react";
import './SensoButton.scss'
import {styled} from "@mui/system";
import {Button, Icon} from "@mui/material";

export type SensoButtonProps = {
    id: number,
    alignment: string,
    icon: string
    color: string
}

/**
 * A Senso related action button
 * @param props Collection of button related attributes
 * @constructor Create a new senso button.
 */
export const SensoButton = (props: any) => {
    const PlayButton = styled(Button)`
      color: rgba(255, 255, 255, 0.86);
      width: 100%;
      height: 100%;
      background-color: ${props.color};
      --margin: 12px;
      
      &.top-left {
        margin-right: var(--margin);
      }

      &.top-right {
        margin-left: var(--margin);
      }
      &.bottom-left {
        margin-right: var(--margin);
      }

      &.bottom-right {
        margin-left: var(--margin);
      }
      
      span {
        font-size: 4vw;
      }
    `;

    return(
        <PlayButton className={`clipped ${props.alignment}`}>
            <Icon baseClassName="material-icons-round">
                {props.icon}
            </Icon>
        </PlayButton>
    );
};