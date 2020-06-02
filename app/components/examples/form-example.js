import React from 'react'
import {useForm} from "react-hook-form";
import {Input, Typography} from 'antd';
import * as yup from "yup";

const {Title} = Typography

/* For each form, a form schema has to be built. This is used for client-side validation. */
const formSchema = yup.object().shape({
    input1: yup.string().required(),
    input2: yup
        .number()
        .required()
        .positive()
        .integer(),
});

export default function FormExample() {
    /* useForm is a custom hook to build forms. It uses a defined validationSchema.
    * It gives a register function (to register fields in the form), errors (that happened during validation), a handleSubmit handler (that does the validation)
    * and a setValue function to manually set values of a form (and thereby make it work with any UI library) */
    const {register, errors, handleSubmit, setValue} = useForm({
        validationSchema: formSchema
    })

    const onSubmit = (data) => console.log(data)

    /* As we are using Ant-Design, we need to register form fields manually during first build of a component. This can be done in a useEffect hook. */
    React.useEffect(() => {
        register({name: "input1"})
        register({name: "input2"})
    }, [])

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