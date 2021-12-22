import React from "react";
import {Observer} from "mobx-react";

/**
 * React context to manage the state of global accessibility Settings
 */
const AccessibilityContext = React.createContext({});

/**
 * The global accessibility context provider
 * @param children List of child components which will be provided with the accessibility context
 * @param accessibilityContext The handed-over accessibility context itself
 * @constructor
 */
export const AccessibilityContextProvider = ({children, accessibilityContext}: any) => {
    return (
        <AccessibilityContext.Provider value={accessibilityContext}>
            {children}
        </AccessibilityContext.Provider>
    )
}

/**
 * The global accessibility context consumer component
 * @param children List of child components which will consume the accessibility context
 * @constructor
 */
export const AccessibilityContextConsumer = ({children}: any) => {
    return (
        <AccessibilityContext.Consumer>
            {(value) => (<Observer>{() => children(value)}</Observer>)}
        </AccessibilityContext.Consumer>
    )
}

/* Hook to use the accessibility related menuContext in any functional component */
const useAccessibilityContext = () => React.useContext(AccessibilityContext);

/* HOC to inject the accessibility related menuContext to any functional or class component */
export const withAccessibilityContext = (Component: any) => (props: any) => {
    return <Component {...props} accessibilityContext={useAccessibilityContext()} />;
};

