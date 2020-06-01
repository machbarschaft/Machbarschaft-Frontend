import React from 'react'
import PropTypes from 'prop-types'
import {Typography, Button, Divider, Space} from 'antd';

const {Title, Text} = Typography;

export default function UseEffectExample({timout = 5000}) {
    const [remainingTime, setRemainingTime] = React.useState(timout)
    const intervalID = React.useRef(null)

    React.useEffect(() => {
        intervalID.current = window.setInterval(() => {
            setRemainingTime((curRemainingTime) => {
                if(curRemainingTime <= 0) {
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

UseEffectExample.propTypes = {
    timeout: PropTypes.number
}