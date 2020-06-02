import React from 'react'
import PropTypes from 'prop-types'
import {Typography} from 'antd';

const {Title, Text} = Typography;

export default function UseEffectExample({timout = 5000}) {
    const [remainingTime, setRemainingTime] = React.useState(timout)
    /* A variable defined with React.useRef persists throughout render calls. */
    const intervalID = React.useRef(null)

    /* React.useEffect executes an effect. It is executed every time a variable given in the inputs parameter changes.
    If the inputs parameter is empty, it is only called during first build.
    The return of an effect is a function that is executed, when the component dismounts. */
    React.useEffect(() => {
        intervalID.current = window.setInterval(() => {
            setRemainingTime((curRemainingTime) => {
                if (curRemainingTime <= 0) {
                    window.clearInterval(intervalID.current)
                    return 0
                } else {
                    return curRemainingTime - 100
                }
            })
        }, 100)

        return () => window.clearInterval(intervalID.current)
    }, [timout])

    return (
        <React.Fragment>
            <Title level={3}>React.useEffect</Title>
            <Text>Countdown: {remainingTime}</Text>
        </React.Fragment>
    )
}

/* PropTypes can be defined for any component to state the parameters. Parameters can be set to required. */
UseEffectExample.propTypes = {
    timeout: PropTypes.number
}