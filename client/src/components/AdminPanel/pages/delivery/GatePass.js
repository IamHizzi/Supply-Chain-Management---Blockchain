import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../controls/Controls";
import { useForm, Form } from '../../useForm';
import * as deliveryService from '../../services/deliveryService'
import * as GiIcons from 'react-icons/gi'
import * as AiIcons from 'react-icons/ai'
const initialFValues = {
    id: 0,
    consigneeName:'',
    shippingAddress:'',
    transportCompany:'TCS',
    deliveryDate: new Date()
}

export default function GatePass(props) {

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
            <Grid container style={{marginLeft:'2%'}}>
                <Grid>
                <Controls.Input
                        name="id"
                        label="CN No"
                        value={values.id}
                        onChange={handleInputChange}
                        error={errors.id}
                        icon={<AiIcons.AiOutlineFieldNumber/>}
                    />
                    
                    <Controls.Input
                        name="consigneeName"
                        label="Consignee "
                        value={values.consigneeName}
                        onChange={handleInputChange}
                        error={errors.consigneeName}
                        icon={<AiIcons.AiOutlineSend/>}
                    />
                    <Controls.Select
                        name="transportCompany"
                        label="Delivery Through"
                        value={values.transportCompany}
                        onChange={handleInputChange}
                        options={deliveryService.getTransportCompanies()}
                        error={errors.transportCompany}
                        icon={<GiIcons.GiOrganigram/>}
                    />
                    <Controls.DatePicker
                        name="manifestDate"
                        label="Date of Dispatch"
                        value={values.manifestDate}
                        onChange={handleInputChange}
                    />
                    <div style={{marginTop:'2%'}}>
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