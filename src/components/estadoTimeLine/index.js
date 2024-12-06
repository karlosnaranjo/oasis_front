import { useCallback, useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import { withApi, withNotification } from 'wrappers';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ConfirmModal } from 'components/dialogs';
import messages from 'constantes/messages';

function VerticalLinearStepper({ url, urlData, doGet, doPut, appInfo, genericException, refresh }) {
  const [steps, setSteps] = useState([]);
  const [action, setAction] = useState(null);
  const [activeStep, setActiveStep] = useState(0);

  // Call to API for load form values
  const loadFields = useCallback(async () => {
    const params = {
      url: `${url}/initestado`,
      data: { ...urlData }
    };
    const resp = await doGet(params);
    return resp;
  }, [doGet, url, urlData]);

  const init = useCallback(async () => {
    try {
      const { states, currentState } = await loadFields();
      const current = states.find((item) => item.state === currentState);
      console.log(current);
      if (current) {
        setActiveStep(current.id - 1);
      }
      console.log(states);
      setSteps(states);
    } catch (error) {
      genericException(error);
    }
  }, [genericException, loadFields]);

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const closeModal = () => setAction(null);

  const openModal = (stateAction) => {
    setAction(stateAction);
  };

  // Call to API for remove record according with your id
  const onAccept = async () => {
    const params = {
      url: `${url}/updateestado`,
      data: { state: action, ...urlData }
    };

    try {
      await doPut(params);
      init();
      refresh();
      closeModal();
      appInfo(messages.crud.update);
    } catch (error) {
      genericException(error);
    }
  };

  return (
    <>
      {Boolean(action) && (
        <ConfirmModal
          open
          title="Actualizar el estado"
          message="¿Está seguro de actualizar el estado de este registro?"
          onClose={closeModal}
          onAccept={onAccept}
        />
      )}
      <Typography>Estado</Typography>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step) => {
          const { state, transition } = step;
          console.log(transition);
          return (
            <Step key={state}>
              <StepLabel>{state}</StepLabel>
              <StepContent>
                <Box sx={{ p: 1 }}>
                  <div>
                    {transition &&
                      transition.map((transition) => {
                        const { state, color, label } = transition;
                        return (
                          <Button
                            key={`index-${state}`}
                            variant="contained"
                            onClick={() => openModal(state)}
                            color={color ?? 'primary'}
                            sx={{ minWidth: '100px', mt: 1, mr: 1 }}
                          >
                            {label}
                          </Button>
                        );
                      })}
                  </div>
                </Box>
              </StepContent>
            </Step>
          );
        })}
      </Stepper>
    </>
  );
}

VerticalLinearStepper.propTypes = {
  doGet: PropTypes.func.isRequired,
  doPut: PropTypes.func.isRequired,
  appInfo: PropTypes.func.isRequired,
  url: PropTypes.string,
  urlData: PropTypes.oneOfType([PropTypes.object]),
  genericException: PropTypes.func.isRequired,
  refresh: PropTypes.func.isRequired
};

export default withApi(withNotification(VerticalLinearStepper));
