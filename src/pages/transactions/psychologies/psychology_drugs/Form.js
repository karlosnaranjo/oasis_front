import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, Dialog, DialogTitle, DialogContent } from '@mui/material';
import { Form, Field, Formik } from 'formik';
import * as Yup from 'yup';
import { SelectBase, TextBase,  Loader, ButtonSave, ButtonBase } from 'components';
import endPoints from 'endPoints/endPoints';
import messages from 'constantes/messages';
import { withApi, withNotification } from 'wrappers';
import { Box } from '@mui/system';
import { getStatusLabel, getStatusValue } from "utils/formHelpers";

import DatePickerBase from 'components/pickers/DatePickerBase';

const validationSchema = Yup.object({
	drug_id: Yup.string().required('Sustancia es requerido'),
	start_age: Yup.string().required('Edad de inicio es requerido'),
	frecuency_of_consumption: Yup.string().required('Frecuencia de Consumo es requerido'),
	maximum_abstinence: Yup.string().required('Maxima abstinencia es requerido'),
	consumption_date: Yup.string().required('Fecha ultimo consumo es requerido'),
 
});

const urlBase = endPoints.transactions.psychologyDrugs.base;

let drugList = [];


const initState = {
		drug_id: null,
	start_age: false,
	frecuency_of_consumption: false,
	maximum_abstinence: false,
	consumption_date: false,

};

const selectMap = (data) => {
    return data.map((row) => ({ value: row.id, label: row.name }));
};

const PsychologyDrugsForm = ({
    id,
    psychology_id,
    doGet,
    genericException,
    appSuccess,
    doPost,
    doPut,
    appInfo,
    setEditable,
    viewMode,
    setOpenModal,
    refreshData,
    refreshTable
    }) => {
    const [state, setState] = useState(initState);
    const [isLoading, setLoading] = useState(true);

    // Call to API for load form values
    const loadFields = useCallback(async () => {
    const params = {
        url: endPoints.transactions.psychologyDrugs.initForm,
        data: id ? { id: id } : {}
    };
    const resp = await doGet(params);
    return resp;
    }, [doGet, id, setEditable]);

    const init = useCallback(async () => {
    try {
        const { psychologyDrugs, drug,  } = await loadFields();
drugList = selectMap(drug);


        const {
            drug_id, start_age, frecuency_of_consumption, maximum_abstinence, consumption_date, 
        } = psychologyDrugs;

        setState({
            						drug_id: drug_id || null,
			start_age: start_age || "",
			frecuency_of_consumption: frecuency_of_consumption || "",
			maximum_abstinence: maximum_abstinence || "",
			consumption_date: consumption_date || "",

        });

        setLoading(false);
    } catch (error) {
        console.log('ERROR AL INICIAR'+error);
        genericException(error);
    }
    }, [genericException, loadFields]);

    useEffect(() => {
        init();
    }, [init]);

    const mapValues = (values) => {
        const { drug_id, start_age, frecuency_of_consumption, maximum_abstinence, consumption_date,  } = values;
        return {
            psychology_id: psychology_id,
            drug_id, start_age, frecuency_of_consumption, maximum_abstinence, consumption_date, 
        };
    };

    const submit = async (valuesForm) => {
        const method = id ? doPut : doPost;
        const data = mapValues(valuesForm);
        const params = {
            url: `${urlBase}${id ? `/${id}` : ''}`,
            //url: id ? `${urlBase}/${id}` : urlBase,
            data: data
        };

        try {
            const resp = await method(params);
            if (id) {
                appInfo(messages.crud.update);
            } else {
                appSuccess(messages.crud.new);
            }
            refreshTable()
        } catch (error) {
            console.log('ERROR AL GUARDAR '+error);
            genericException(error);
        } finally {
            setOpenModal(false);
            refreshData.current.refresh();
        }
    };

    return (
    <Dialog fullWidth maxWidth="xl" open onClose={() => setOpenModal(false)} aria-labelledby="max-width-dialog-title">
        <DialogTitle id="max-width-dialog-title">Cuadro de consumo</DialogTitle>
        <DialogContent>
            
        {isLoading ? (
            <Box p={10}>
                <Loader />
            </Box>
        ) : (
            <Formik enableReinitialize initialValues={state} validationSchema={validationSchema} onSubmit={submit}>
                {(subProps) => (
                <Form>
                    <Grid container direction="row" spacing={2}>
    
                                <Grid item xs={6} md={6} xl={6}>
                                    <Field label="Sustancia" name="drug_id" component={SelectBase} items={drugList}  
                                        /*onOptionSelected={(selectedOption) => handleOnChangedrug_id(selectedOption, subProps)} */
                                    />
                                </Grid>
                    
                        <Grid item xs={6} md={6} xl={6}>
                            <Field label="Edad de inicio" name="start_age" component={TextBase} 
                                //onClick={(event) => handleChangestart_age(event)} 
                            />
                        </Grid>
            
                        <Grid item xs={6} md={6} xl={6}>
                            <Field label="Frecuencia de Consumo" name="frecuency_of_consumption" component={TextBase} 
                                //onClick={(event) => handleChangefrecuency_of_consumption(event)} 
                            />
                        </Grid>
            
                        <Grid item xs={6} md={6} xl={6}>
                            <Field label="Maxima abstinencia" name="maximum_abstinence" component={TextBase} 
                                //onClick={(event) => handleChangemaximum_abstinence(event)} 
                            />
                        </Grid>
            
                        <Grid item xs={6} md={6} xl={6}>
                            <Field label="Fecha ultimo consumo" name="consumption_date" component={DatePickerBase} 
                                //onClick={(event) => handleChangeconsumption_date(event)} 
                            />
                        </Grid>
            
                    </Grid>
                    <Grid container direction="row" style={{ paddingTop: 30 }} justify="flex-end">
                        <Grid item>
                            <ButtonSave />
                            <ButtonBase
                                onClick={() => setOpenModal(false)}
                                label="Cancelar"
                                style={{ marginLeft: 15 }}
                            />
                        </Grid>
                    </Grid>
                </Form>
                )}
            </Formik>
        )}
       </DialogContent>
    </Dialog>
            
    );
};

PsychologyDrugsForm.propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    doPost: PropTypes.func,
    doGet: PropTypes.func,
    doPut: PropTypes.func,
    appInfo: PropTypes.func.isRequired,
    appSuccess: PropTypes.func.isRequired,
    genericException: PropTypes.func.isRequired,
    setEditable: PropTypes.func,
    refresh: PropTypes.oneOfType([PropTypes.object])
};

export default withApi(withNotification(PsychologyDrugsForm));