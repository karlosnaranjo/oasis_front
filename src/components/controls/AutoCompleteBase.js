import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Autocomplete from '@mui/material/Autocomplete';
import { CircularProgress, TextField } from '@mui/material';
import KeyboardHideIcon from '@mui/icons-material/KeyboardHide';
import { withApi, withNotification } from 'wrappers';

/**
 * This component allows to render a dropdown ready to work with formik
 * @param {*} param0
 */

const WAIT = 1000;
let timeout = null;
const AutocompleteBase = ({
  label,
  onOptionSelected,
  field: { name, value },
  form: { touched, errors, setFieldValue },
  doGet,
  searchValue,
  disabled,
  url,
  limit,
  genericException,
  requestParams
}) => {
  const [options, setOptions] = useState([]);
  const [open, setOpen] = useState(false);
  const [findValue, setFindValue] = useState(searchValue);
  const [loading, setLoading] = useState(false);

  const handleChange = async (e, itemSelected) => {
    if (onOptionSelected) {
      await onOptionSelected(itemSelected);
    } else {
      setFieldValue(name, itemSelected?.value ?? '');
    }
  };

  const filter = useCallback(async (findValue) => {
    if (findValue) {
      const getOptions = async () => {
        let resp = [];
        const fetchParams = {
          url,
          data: {
            search: findValue ?? '',
            limit,
            ...requestParams
          }
        };
        try {
          resp = await doGet(fetchParams);
        } catch (error) {
          genericException(error);
        }
        return resp;
      };
      setOptions(await getOptions());
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    clearTimeout(timeout);
    if (findValue && open) {
      setLoading(true);
      timeout = setTimeout(() => filter(findValue), WAIT);
    }
  }, [filter, findValue, open]);

  const onClose = async () => {
    setOpen(false);
    if (loading) {
      setLoading(false);
    }
  };

  const onOpen = async () => {
    setOpen(true);
    setFindValue('');
    if (loading) {
      setLoading(false);
    }
  };

  const hasError = touched[name] && Boolean(errors[name]);
  return (
    <Autocomplete
      id={name}
      name={name}
      disabled={disabled}
      clearText="Limpiar"
      closeText="Cerrar"
      openText="Abrir"
      noOptionsText={findValue === '' ? 'Escriba para iniciar la búsqueda' : 'Sin opciones'}
      loadingText={findValue ? 'Buscando...' : 'Iniciar busqueda'}
      loading={loading}
      onOpen={onOpen}
      onClose={onClose}
      inputValue={findValue}
      getOptionLabel={(option) => option.label || ''}
      isOptionEqualToValue={(option) => option.value === (value ?? '')}
      onChange={handleChange}
      onInputChange={(event, newInputValue, reason) => {
        if (open || reason === 'clear') setFindValue(newInputValue);
      }}
      options={options}
      popupIcon={<KeyboardHideIcon />}
      renderInput={(params) => (
        <TextField
          {...params}
          size="small"
          label={label}
          variant="outlined"
          autoComplete="off"
          error={hasError}
          helperText={hasError && errors[name]}
          fullWidth
          margin="dense"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress
                    color="inherit"
                    size={20}
                    sx={{
                      marginRight: 4
                    }}
                  />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            )
          }}
        />
      )}
    />
  );
};

AutocompleteBase.defaultProps = {
  limit: 10,
  disabled: false
  // searchValue: ''
};

AutocompleteBase.propTypes = {
  form: PropTypes.shape({
    errors: PropTypes.shape(),
    touched: PropTypes.shape(),
    setFieldTouched: PropTypes.func.isRequired,
    setFieldValue: PropTypes.func.isRequired
  }).isRequired,
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    onBlur: PropTypes.func.isRequired,
    onChange: PropTypes.func,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
  }).isRequired,
  label: PropTypes.string.isRequired,
  // el valor que se indicará en el input de busqueda, por defecto vacio cuando
  // no se especifica o cuando no se especifica nada en el value desde field.value y es requerido
  // cuando se especifica un value desde field.value
  searchValue: PropTypes.string,
  // Funcion que se ejecutara al momento de seleccionar un Item.
  onOptionSelected: PropTypes.func,
  // Parametros adicionales que se mandaran al llamado de la api especificado en la props url
  requestParams: PropTypes.oneOfType([PropTypes.object]),
  // Props boleana para espeficiar si el campo esta habilitado o inhabilitado para edición
  // se adiciona el prop de string para evitar error de prop
  // ya que al seleccionar un registro lo envia como vacio.
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  // Ruta de la api para consultar los registros del input.
  url: PropTypes.string.isRequired,
  limit: PropTypes.number,
  // Una funcion que será usada para extraer y procesar las respuestas ajax.
  // Por defecto null, cuando no se especifica, los datos serán procesados como:
  // response.json() -> then -> (json) => json.data.data
  dataProcessor: PropTypes.func,
  doGet: PropTypes.func.isRequired,
  genericException: PropTypes.func.isRequired
};

export default React.memo(withApi(withNotification(AutocompleteBase)));
