import { TextBase, SelectBase, SwitchBase } from 'components';
import InputTag from 'components/inputTag/inputTag';
import DropdownMultiple from 'components/DropdownMultiple/DropdownMultiple';
import { Abreviaturas } from 'constantes';
import DatePickerBase from 'components/pickers/DatePickerBase';

/**
 * Archivo que resuelve el tipo de input dependiendo de la llave que se especifique por
 * medio de abreviaturas.
 * @author Julian Andres Osorio
 */
const fieldTypes = {};
fieldTypes[Abreviaturas.FIELD_TYPE_DATE] = DatePickerBase;
fieldTypes[Abreviaturas.FIELD_TYPE_TEXT] = TextBase;
fieldTypes[Abreviaturas.FIELD_TYPE_SELECT] = SelectBase;
fieldTypes[Abreviaturas.FIELD_TYPE_NUMBER] = TextBase;
fieldTypes[Abreviaturas.FIELD_TYPE_LOGIC] = SwitchBase;
fieldTypes[Abreviaturas.FIELD_TYPE_INPUTTAG] = InputTag;
fieldTypes[Abreviaturas.FIELD_TYPE_MULTIPLE] = DropdownMultiple;

export default fieldTypes;
