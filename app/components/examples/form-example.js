import React from 'react'
import {useForm} from "react-hook-form";
import {Input, Typography} from 'antd';
import * as yup from "yup";

const {Title} = Typography

const formSchema = yup.object().shape({
    input1: yup.string().required(),
    input2: yup
        .number()
        .required()
        .positive()
        .integer(),
});

export default function FormExample() {
    const {register, errors, handleSubmit, setValue} = useForm({
        validationSchema: formSchema
    })

    const onSubmit = (data) => console.log(data)

    React.useEffect(() => {
        register({name: "input1"})
        register({name: "input2"})
    }, [register])

    return (
        <React.Fragment>
            <Title level={3}>Form Validation</Title>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Input name={"input1"} onChange={(e) => setValue("input1", e.target.value)}/>
                {errors.input1 && <p>{errors.input1.message}</p>}
                <Input name={"input2"} onChange={(e) => setValue("input2", e.target.value)}/>
                {errors.input2 && <p>{errors.input2.message}</p>}
                <input type={"submit"}/>
            </form>
        </React.Fragment>

    )
}