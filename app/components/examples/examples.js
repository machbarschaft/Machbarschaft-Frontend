import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import ThemeContext, {ThemeProvider} from "../../contexts/examples/theme";
import {Divider, Typography} from "antd";
import NavigationExample from "./navigation-example";

const {Text} = Typography;

const UseStateExample = React.lazy(() => import("./use-state-example"))
const UseEffectExample = React.lazy(() => import("./use-effect-example"))
const UseReducerExample = React.lazy(() => import("./use-reducer-example"))
const APICallExample = React.lazy(() => import("./api-call-example"))
const ConsumerProviderExample = React.lazy(() => import("./consumer-provider-example"))
const CustomHookExample = React.lazy(() => import("./custom-hook-example"))
const FormExample = React.lazy(() => import("./form-example"))

export default function Examples() {
    const [theme, setTheme] = React.useState('light')
    const toggleTheme = () => setTheme((theme) => theme === 'light' ? 'dark' : 'light')

    return (
        <Router>
            <ThemeProvider value={theme}>
                <NavigationExample/>
                <Divider/>

                <React.Suspense fallback={<Text>Lädt...</Text>}>
                    <Switch>
                        <Route exact path={"/examples/use-state"} component={UseStateExample}/>
                        <Route exact path={"/examples/use-effect"} component={UseEffectExample}/>
                        <Route exact path={"/examples/use-reducer"} component={UseReducerExample}/>
                        <Route exact path={"/examples/api-call"} component={APICallExample}/>
                        <Route exact path={"/examples/consumer-provider"}
                               render={() => <ConsumerProviderExample toggleTheme={toggleTheme}/>}/>
                        <Route exact path={"/examples/custom-hook"} component={CustomHookExample}/>
                        <Route exact path={"/examples/form"} component={FormExample}/>
                    </Switch>
                </React.Suspense>
            </ThemeProvider>
        </Router>
    )
}