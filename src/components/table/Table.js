import React from "react";
import PropTypes from "prop-types";
import { Paper, TableContainer, Table as TableM } from "@mui/material";
import { withApi, withNotification } from "wrappers";
import { DEFAULT_MUI_DATATABLE_SIZE } from "constantes/constants";
import { isFunction } from "utils/functions";
import Head from "./Head";
import Body from "./Body";
import BodySelect from "./select/Body";
import Pagination from "./Pagination";
import BodyExpandable from "./expandable/Body";
import ToolBar from "./ToolBar";

/* Para actualizar la tabla serverside
 * ------ En el componente padre -------
 * -> Crear la referencia
 *    this.child = React.createRef();
 * -> Enviar referencia por props
 *    <TableGeneral forwardedRef={this.child} />
 * -> Para ejecutar el metodo refrescar
 *    this.child.current.refresh();
 */
class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      page: 0,
      rowsPerPage: 10,
      order: "",
      orderBy: "",
      total: 0,
      data: [],
      selected: [],
      filters: {},
    };
    const { forwardedRef } = this.props;
    if (forwardedRef) {
      forwardedRef.current = { refresh: this.serverSide };
    }
  }

  componentDidMount() {
    const { serverSideUrl } = this.props;
    if (serverSideUrl) {
      this.serverSide();
    } else {
      this.processData();
      this.setState({ isLoading: false });
    }
  }

  // Funcion para evaluar cambios en los datos
  componentDidUpdate(prevProps) {
    const { data, serverSideUrl } = this.props;
    if (prevProps.data !== data && !serverSideUrl) {
      this.processData();
    }
  }

  // Funcion para cambiar los filtros
  setFilter = (filters) => {
    if (this.props.serverSideUrl) {
      this.setState({ filters, page: 0, isLoading: true }, this.serverSide);
    } else {
      const data = this.filterData(filters);
      this.setState({ data, page: 0 });
    }
  };

  // Funcion para cambiar de pagina
  setPage = (page) => {
    if (this.props.serverSideUrl) {
      this.setState({ page, isLoading: true }, this.serverSide);
    } else {
      this.setState({ page });
    }
  };

  // Funcion para cambiar los registros por pagina
  setRowsPerPage = (rowsPerPage) => {
    if (this.props.serverSideUrl) {
      this.setState({ rowsPerPage, page: 0, isLoading: true }, this.serverSide);
    } else {
      this.setState({ rowsPerPage, page: 0 });
    }
  };

  // Funcion para forma de ordenar, ascendente o descendente, segun seleccionada
  setOrderBy = (orderBy) => {
    const isAsc = orderBy === this.state.orderBy && this.state.order === "asc";
    const order = isAsc ? "desc" : "asc";

    if (this.props.serverSideUrl) {
      this.setState({ order, orderBy, isLoading: true }, this.serverSide);
    } else {
      const data = this.orderData(order, orderBy);
      this.setState({ order, orderBy, data });
    }
  };

  // Funcion para filtrar los elementos segun parametros de busqueda
  // TODO: Hacer filtro de datos normales
  // https://www.w3schools.com/jsref/jsref_includes.asp
  filterData = (filters) => {
    const { data } = this.props;
    const filterData = Object.entries(filters);
    let newData = data;
    filterData.forEach((filter) => {
      newData = newData.filter((row) =>
        String(row[filter[0]]).includes(String(filter[1]))
      );
    });

    return newData;
  };

  // Funcion que me devuelve registros organizados segun parametros recibidos
  orderData = (order, orderBy) => {
    const { data } = this.props;
    const ascending = order === "asc" ? 1 : -1;
    const orderedData = data.sort((a, b) => {
      if (a[orderBy] < b[orderBy]) {
        return -1 * ascending;
      }
      if (a[orderBy] > b[orderBy]) {
        return 1 * ascending;
      }
      return 0;
    });

    return orderedData;
  };

  // Función que filtra solo datos segun pagina y registros por pagina
  pageData = (data) => {
    if (this.props.serverSideUrl) {
      return data;
    }

    const { page, rowsPerPage } = this.state;
    const initialRow = page * rowsPerPage;
    return data.slice(initialRow, initialRow + rowsPerPage);
  };

  // Funcion encargada de cargar los datos solicitados segun parametros
  serverSide = async () => {
    const { serverSideUrl, serverSideData, doGet, onDataLoaded } = this.props;
    const { page, rowsPerPage, order, orderBy, filters } = this.state;
    const sorts = {};
    if (orderBy && orderBy !== "") {
      sorts[orderBy] = order;
    }

    const params = {
      url: serverSideUrl,
      data: {
        perPage: rowsPerPage,
        page: page + 1,
        sorts: JSON.stringify(sorts),
        filters: JSON.stringify(filters),
        ...serverSideData,
      },
    };

    try {
      const resp = await doGet(params);
      const { data, total } = resp.response;
      this.setState({
        data,
        total: total || 0,
        isLoading: false,
      });
      if (isFunction(onDataLoaded)) {
        onDataLoaded(resp);
      }
    } catch (error) {
      this.props.appError(
        "Ocurrio un error cargando los datos de la tabla",
        error
      );
    }
  };

  verifyExist = (row) => {
    const { selected } = this.state;
    let index = -1;
    selected.forEach((element, i) => {
      if (Object.is(element, row)) {
        index = i;
      }
    });
    return index;
  };

  handleSelectAllClick = (event) => {
    let newSelecteds = [];
    const { data } = this.state;
    const { onRowsSelect } = this.props;
    if (event.target.checked) {
      newSelecteds = data.map((row) => row);
    }
    this.setState({ selected: newSelecteds }, () =>
      onRowsSelect(this.state.selected)
    );
  };

  setCheck = (row) => {
    const { onRowsSelect, singleSelect } = this.props;
    const index = this.verifyExist(row);
    if (index >= 0) {
      this.setState(
        (prevState) => {
          const datos = prevState.selected;
          datos.splice(index, 1);
          return { selected: datos };
        },
        () => onRowsSelect(this.state.selected)
      );
    } else {
      this.setState(
        (prevState) => {
          const selected = singleSelect ? [row] : [...prevState.selected, row];
          return { selected };
        },
        () => onRowsSelect(this.state.selected)
      );
    }
  };

  // Funcion que llama las correspondientes funciones segun el caso
  processData = () => {
    const { order, orderBy } = this.state;
    const orderData = this.orderData(order, orderBy);
    this.setState({ data: orderData, total: orderData.length });
  };

  render() {
    const {
      columns,
      title,
      onCreate,
      createPermissions,
      onRowsSelect,
      ExtraToolBar,
      paperProps,
      disableCreateButton,
      disableToolbar,
      expandable,
    } = this.props;
    const {
      page,
      rowsPerPage,
      order,
      orderBy,
      data,
      total,
      filters,
      isLoading,
      selected,
    } = this.state;
    return (
      <Paper {...paperProps}>
        {!disableToolbar ? (
          <ToolBar
            title={title}
            columns={columns}
            filters={filters}
            setFilter={this.setFilter}
            onCreate={onCreate}
            createPermissions={createPermissions}
            ExtraToolBar={ExtraToolBar}
            disableCreateButton={disableCreateButton || false}
          />
        ) : (
          ""
        )}
        <TableContainer>
          <TableM size={DEFAULT_MUI_DATATABLE_SIZE}>
            <Head
              columns={columns}
              order={order}
              orderBy={orderBy}
              setOrderBy={this.setOrderBy}
              extraColumn={Boolean(onRowsSelect)}
              expandable={Boolean(expandable)}
              handleSelectAllClick={this.handleSelectAllClick}
              selected={selected}
              totalRow={total}
            />
            {Boolean(expandable) && (
              <BodyExpandable
                columns={columns}
                data={this.pageData(data)}
                isLoading={isLoading}
                expandable={expandable}
              />
            )}
            {Boolean(onRowsSelect) && (
              <BodySelect
                columns={columns}
                data={this.pageData(data)}
                isLoading={isLoading}
                onRowsSelect={onRowsSelect}
                setCheck={this.setCheck}
                verifyExist={this.verifyExist}
              />
            )}
            {!onRowsSelect && !expandable && (
              <Body
                columns={columns}
                data={this.pageData(data)}
                isLoading={isLoading}
              />
            )}
          </TableM>
        </TableContainer>
        <Pagination
          page={page}
          rowsPerPage={rowsPerPage}
          total={total}
          setPage={this.setPage}
          setRowsPerPage={this.setRowsPerPage}
        />
      </Paper>
    );
  }
}

Table.defaultProps = {
  data: [],
  paperProps: {},
};

Table.propTypes = {
  // permite especificar las props para el paper que envuelve a esta tabla
  paperProps: PropTypes.shape(),
  // Array de columnas, cada columna puede tener varias llaves
  // label: Es el texto que se quiere mostrar en el Toobar de la tabla
  // name: Texto que identificara datos a poner en cada columna y registros a buscar
  // align: alineacion de las columnas left, rigth, center, por defecto es left
  // component: React component o función, en caso de ser funcion pasa como parametro el registro
  // filter: booleano para filtrar registros, por defecto true
  // width: tamaño de la columna
  // type: tipo de columna, por el momento se acepta 'number'
  columns: PropTypes.oneOfType([PropTypes.array]).isRequired,
  // Array de objetos para mostrar en en la tabla
  data: PropTypes.arrayOf(PropTypes.object),
  // Titulo de la tabla
  title: PropTypes.string,
  // Url a la cual se buscaran los datos
  serverSideUrl: PropTypes.string,
  // Data para la url en caso de necesitar enviar algun parametro extra
  serverSideData: PropTypes.oneOfType([PropTypes.object]),
  // Funcion para crear nuevos registros
  onCreate: PropTypes.func,
  // Funcion para expandir la columna, devuelve como parametro el registro
  expandable: PropTypes.func,
  // Funcion para retornar la data que llega del servidor
  onDataLoaded: PropTypes.func,
  // Funcion que devuelve las columnas seleccionadas
  onRowsSelect: PropTypes.func,
  // Booleano para seleccionar solo un registro
  singleSelect: PropTypes.bool,
  // Elemento para crear nuevos botones que se deseen adicionar en la parte superior de la tabla.
  ExtraToolBar: PropTypes.node,
  // Permisos para el boton de crear
  createPermissions: PropTypes.string,
  doGet: PropTypes.func,
  appError: PropTypes.func.isRequired,
  forwardedRef: PropTypes.oneOfType([PropTypes.object]),
  // Prop para habilitar o deshabilitar el boton de create.
  disableCreateButton: PropTypes.bool,
  // Props para habilitar o deshabilitar el toolbar
  disableToolbar: PropTypes.bool,
  // Para table de selección si deseo deshabilitar el Checkbox para una row en especifico,
  // en el data se debe enviar el campo "selectable" con valor booleano para
  // habilitar o deshabilitar.
};

export default withApi(withNotification(Table));
