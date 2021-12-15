import { Observer } from 'mobx-react';
import React from 'react';
import {SensoGameplaySession} from "../../gameplay/SensoGameplaySession";

/**
 * The global gameplay session fto manage the senso game
 */
export const GameplaySession = new SensoGameplaySession()
/**
 * The global senso's gemeplay context
 */
export const SensoGameplayContext = React.createContext({session: GameplaySession})
/**
 * The senso gameplay context provider
 * @param children List of child components which will be provided with the gameplay context
 * @constructor
 */
export const GameplayContextProvider = ({children}: any) => {
    return (
        <SensoGameplayContext.Provider value={{session: GameplaySession}}>
            {children}
        </SensoGameplayContext.Provider>
    )
}
/**
 * The senso gameplay context provider
 * @param children List of child components which will consume the gameplay context
 * @constructor
 */
export const GameplayContextConsumer = ({children}: any) => {
    return (
        <SensoGameplayContext.Consumer>
            {(value) => (<Observer>{() => children(value)}</Observer>)}
        </SensoGameplayContext.Consumer>
    )
}