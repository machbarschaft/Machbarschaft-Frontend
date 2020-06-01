import React from 'react'

export default function useFontSizer() {
    const [fontSize, setFontSize] = React.useState(1)

    const increaseFontSize = () => setFontSize((fontSize) => fontSize + 0.25)

    const decreaseFontSize = () => setFontSize((fontSize) => fontSize - 0.25)

    return [fontSize, {increaseFontSize, decreaseFontSize}]
}