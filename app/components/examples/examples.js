import React from 'react'
import ThemeContext, {ThemeProvider} from "../../contexts/examples/theme";
import {Divider, Typography} from "antd";

const {Title, Text, Paragraph} = Typography;

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
        <ThemeProvider value={theme}>
            <React.Suspense fallback={<Text>Lädt...</Text>}>
                <UseStateExample/>
                <Divider/>
                <UseEffectExample/>
                <Divider/>
                <UseReducerExample/>
                <Divider/>
                <APICallExample/>
                <Divider/>
                <ConsumerProviderExample toggleTheme={toggleTheme}/>
                <Divider/>
                <CustomHookExample/>
                <Divider/>
                <FormExample/>
            </React.Suspense>
        </ThemeProvider>
    )
}