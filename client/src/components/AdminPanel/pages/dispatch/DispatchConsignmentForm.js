import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../controls/Controls";
import { useForm, Form } from '../../useForm';
import * as AiIcons from 'react-icons/ai'
const initialFValues = {
    id: 0,
    manifestDate: new Date(),
    vehicleNo:'',
}

export default function DispatchConsignmentForm(props) {

    const { addOrEdit, recordForEdit } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }

        if ('vehicleNo' in fieldValues)
            temp.vehicleNo = fieldValues.vehicleNo ? "" : "This field is required."
        
            setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
        //else console.log(temp);    
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()){
          //manifestService.insertManifestItem(values);
          addOrEdit(values, resetForm);
          //resetForm()
        }

    }

    useEffect(() => {
        if (recordForEdit != null)
            setValues({
                ...recordForEdit
            })
    }, [recordForEdit])

    return (
          <Form onSubmit={handleSubmit}>
            <Grid container style={{marginLeft:'3%'}}>
                <Grid>
                <Controls.Input
                        name="id"
                        label="MF No"
                        value={values.id}
                        onChange={handleInputChange}
                        error={errors.id}
                        icon={<AiIcons.AiOutlineFieldNumber/>}
                    />
                    <Controls.DatePicker
                        name="manifestDate"
                        label="Date of Dispatch"
                        onChange={handleInputChange}
                    />
                    <Controls.Input
                        name="vehicleNo"
                        label="Vehicle/Lorry No"
                        value={values.vehicleNo}
                        onChange={handleInputChange}
                        error={errors.vehicleNo}
                        icon={<AiIcons.AiOutlineFieldNumber/>}
                    />
                    <div style={{marginTop:'3%'}}>
                        <Controls.Button
                            type="submit"
                            text="Submit" />
                        <Controls.Button
                            text="Reset"
                            color="default"
                            onClick={resetForm} />
                    </div>
                    </Grid>
                </Grid>
        </Form>
   )
}