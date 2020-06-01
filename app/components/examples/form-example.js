import React from 'react'
import {useForm} from "react-hook-form";
import {Input, Button, Typography} from 'antd';

const {Paragraph, Title, Text} = Typography

export default function FormExample() {
    const {register, errors, handleSubmit, setValue} = useForm()

    const onSubmit = (data) => console.log(data)

    React.useEffect(() => {
        register({name: "Input1", required: true})
    }, [register])

    return (
        <React.Fragment>
            <Title level={3}>Form Validation</Title>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Input name={"Input1"} onChange={(e) => setValue("Input1", e.target.value)}/>
                {errors.Input1 && "Gib Input1 ein"}
                <input type={"submit"}/>
            </form>
        </React.Fragment>

    )
}