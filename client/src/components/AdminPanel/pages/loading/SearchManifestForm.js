import React, { useState, useEffect } from 'react'
import { Grid, } from '@material-ui/core';
import Controls from "../../controls/Controls";
import { useForm, Form } from '../../useForm';
import * as consignmentService from '../../services/consignmentService';
import * as manifestService from '../../services/manifestService';
import * as FcIcons from 'react-icons/fc'
import * as AiIcons from 'react-icons/ai'
import * as MdIcons from 'react-icons/md'

const initialFValues = {
    id: 0,
    manifestDate: new Date(),
    from:'',
    to:'',
    vehicleNo:'',
    amount:'',
    advancePayment:'',
    dueBalance:'',
    Remarks:'',
}

export default function SearchManifestForm(props) {

    const { addOrEdit, recordForEdit } = props

    const validate = (fieldValues = values) => {
        let temp = { ...errors }

        if ('amount' in fieldValues)
            temp.amount = fieldValues.amount.length > 0 ? "" : "Fill this field."
        if ('advancePayment' in fieldValues){
            temp.advancePayment = fieldValues.advancePayment.length > 0 ? "" : "Fill this field."
            if(fieldValues.advancePayment>fieldValues.amount)
            temp.advancePayment="Advance Payment should be less or equal than total amount"
        }
        if ('dueBalance' in fieldValues)
            {
                temp.dueBalance = fieldValues.dueBalance.length > 0 ? "" : "Fill this field."
                if(parseInt(fieldValues.dueBalance) + parseInt(fieldValues.advancePayment)!=parseInt(fieldValues.amount))
                temp.dueBalance="Due balance is incorrect."
            }
        if ('vehicleNo' in fieldValues)
            temp.vehicleNo = fieldValues.vehicleNo.length>0 ? "" : "This field is required."
        if ('Remarks' in fieldValues)
            temp.Remarks = fieldValues.Remarks.length>0 ? "" : "Give some Remarks and Details to Manifest."
        
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
          addOrEdit(values,resetForm);
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
            <Grid container  >
                <Grid item xs={6}>
                    <Controls.DatePicker
                        name="manifestDate"
                        label="Manifest Date"
                        value={values.manifestDate}
                        onChange={handleInputChange}
                    />
                    <Controls.Select
                        name="from"
                        label="From Branch"
                        value={values.from}
                        onChange={handleInputChange}
                        options={consignmentService.getBranchesCollection()}
                        error={errors.from}
                    />
                    <Controls.Select
                        name="to"
                        label="To"
                        value={values.to}
                        onChange={handleInputChange}
                        options={consignmentService.getBranchesCollection()}
                        error={errors.to}
                    />
                    <Controls.Input
                        name="vehicleNo"
                        label="Vehicle No"
                        value={values.vehicleNo}
                        onChange={handleInputChange}
                        error={errors.vehicleNo}
                        icon={<AiIcons.AiOutlineFieldNumber/>}
                    />
                    </Grid>
                    <Grid item xs={6}>
                    <Controls.Input
                        name="amount"
                        label="Total Amount"
                        value={values.amount}
                        onChange={handleInputChange}
                        error={errors.amount}
                        icon={<MdIcons.MdAttachMoney/>}
                    />
                    <Controls.Input
                        name="advancePayment"
                        label="Advance Payment"
                        value={values.advancePayment}
                        onChange={handleInputChange}
                        error={errors.advancePayment}
                        icon={<FcIcons.FcAdvance/>}
                    />
                    <Controls.Input
                        name="dueBalance"
                        label="Due balance"
                        value={values.dueBalance}
                        onChange={handleInputChange}
                        error={errors.dueBalance}
                        icon={<MdIcons.MdAttachMoney/>}
                    />
                    <Controls.Input
                        name="Remarks"
                        label="Remarks"
                        value={values.Remarks}
                        onChange={handleInputChange}
                        error={errors.Remarks}
                        icon={<FcIcons.FcViewDetails/>}
                    />
                    
                    <div style={{float:"right"}}>
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