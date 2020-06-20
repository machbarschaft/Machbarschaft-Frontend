import React from "react"
import {Typography} from "antd";
import PropTypes from "prop-types";

const {Title, Paragraph, Text} = Typography;

export default function PlaceRequestWizardValidationError({wizardState}) {
    return (
        <>
            <Paragraph>
                <Text
                    strong
                    style={{
                        fontSize: 16,
                    }}
                >
                    Es sind folgende Fehler aufgetreten:
                </Text>
            </Paragraph>
            <Paragraph>
                {wizardState.errorMsg}
            </Paragraph>
        </>
    )
}

PlaceRequestWizardValidationError.propTypes = {
    wizardState: PropTypes.object.isRequired
}