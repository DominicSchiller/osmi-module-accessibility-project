import React from "react";
import './SensoButton.View.scss'
import {styled} from "@mui/system";
import {Button, Icon} from "@mui/material";
import {hexToHSL} from "../../../../utils/ColorUtils";
import {ISensoButtonProps, SensoButtonID} from "./SensoButton.Model";
import {SensoGameplaySession} from "../../../../gameplay/SensoGameplaySession";
/**
 * A Senso related action button's view
 * @param props Collection of button related attributes
 * @constructor Create a new senso button.
 */
export const SensoButtonView = (props: ISensoButtonProps) => {

    const hslHoverColor = hexToHSL(props.color)

    const handleOnClick = () => {
        const isCorrect = SensoGameplaySession.shared.isCorrectSelection(props.id)
        if (!SensoGameplaySession.shared.isRoundFinished) {
            document.getElementById("subtitle")!.innerText = isCorrect ? "Richtig" : "Falsch"
        }
    }

    const PlayButton = styled(Button)`
      color: rgba(255, 255, 255, 0.86);
      z-index: 1;
      width: 100%;
      height: 100%;
      background-color: ${props.color};
      transition: all 200ms ease-in-out;
      cursor: pointer;

      
      
      &#${SensoButtonID.TopLeft} {
        margin-right: var(--margin);
        clip-path: url("#cp-top-left");
      }

      &#${SensoButtonID.TopRight} {
        margin-left: var(--margin);
        clip-path: url("#cp-top-right");
      }
      &#${SensoButtonID.BottomLeft} {
        margin-right: var(--margin);
        clip-path: url("#cp-bottom-left");
      }

      &#${SensoButtonID.BottomRight} {
        margin-left: var(--margin);
        clip-path: url("#cp-bottom-right");
      }
      
      &:hover, &:active {
        background-color: hsl(${hslHoverColor.h}, ${hslHoverColor.s}%, ${hslHoverColor.l - 15}%);
      }

      &.selected {
        z-index: 2;
        transform: scale(1.15);
        background-color: hsl(${hslHoverColor.h}, ${hslHoverColor.s}%, ${hslHoverColor.l + 10}%);
        
        span {
          color: #ffffff;
          //font-size: 5vw;
        }
      }
      
      span {
        transition: all 150ms ease-in-out;
        //font-size: 4vw;
      }

      ${props => props.theme.breakpoints.up("xs")} {
        --margin: 4px;
        span {
          font-size: 2.7rem;
        }
        &.selected {
          span {
            font-size: 3.5rem;
          }
        }
      }
      ${props => props.theme.breakpoints.up("sm")} {
        --margin: 4px;
        span {
          font-size: 5.5rem;
        }
        &.selected {
          span {
            font-size: 6.5rem;
          }
        }
      }
      ${props => props.theme.breakpoints.up("md")} {
        --margin: 8px;
        span {
          font-size: 7.5rem;
        }
        &.selected {
          span {
            font-size: 8.5rem;
          }
        }
      }
      ${props => props.theme.breakpoints.up("lg")} {
        --margin: 12px;
        span {
          font-size: 9.5rem;
        }
        &.selected {
          span {
            font-size: 10.5rem;
          }
        }
      }
    `;

    return(
        <PlayButton id={props.id} className={`clipped`} onClick={handleOnClick} disabled={props.disabled} aria-label={props.title}>
            <Icon baseClassName="material-icons-round">
                {props.icon}
            </Icon>
        </PlayButton>
    );
};