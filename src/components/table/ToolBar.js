import React from "react";
import PropTypes from "prop-types";
import {
  Toolbar,
  Typography,
  Tooltip,
  IconButton,
  Modal,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import { FilterList } from "@mui/icons-material";
import { CreateButton } from "components/controls";

const styles = {
  title: {
    flex: 1,
  },
};

function ToolBar({
  title,
  columns,
  filters,
  setFilter,
  onCreate,
  createPermissions,
  ExtraToolBar,
  disableCreateButton,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [search, setSearch] = React.useState(filters);
  const show = Boolean(anchorEl);

  const onClick = (event) => setAnchorEl(event.currentTarget);
  const onClose = () => setAnchorEl(null);

  const changeSearch = ({ target }) => {
    setSearch({ ...search, [target.name]: target.value });
  };

  return (
    <>
      <Toolbar>
        <Typography
          style={styles.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {title || ""}
        </Typography>
        <Tooltip title="Filtros">
          <IconButton
            onClick={onClick}
            sx={{
              "&:hover": (theme) => ({
                color: theme.palette.primary.main,
              }),
            }}
          >
            <FilterList />
          </IconButton>
        </Tooltip>
        {onCreate && (
          <CreateButton
            onClick={onCreate}
            requiredPermissions={createPermissions}
            disabled={disableCreateButton}
          />
        )}
        {ExtraToolBar}
      </Toolbar>
      {show && (
        <Modal onClose={onClose} open>
          <Grid
            container
            direction="row"
            sx={{
              top: "25%",
              left: "30%",
              backgroundColor: "white",
              justifyContent: "center",
              outline: "none",
              // paddingBottom: 4,
              // paddingTop: 20,
              position: "absolute",
              width: "60%",
              borderRadius: 2,
            }}
          >
            <>
              {/* <Grid container direction="row" spacing={2} style={{ padding: 10 }}>
                <Typography variant="h6">Filtros</Typography>
              </Grid> */}
              <Grid
                container
                direction="row"
                spacing={2}
                style={{ padding: 10 }}
              >
                {columns.map(
                  ({ name, label, filter = true }) =>
                    filter && (
                      <Grid key={`G${name}`} item xs={6}>
                        <TextField
                          fullWidth
                          key={`T${name}`}
                          name={name}
                          label={label}
                          type="search"
                          autoComplete="off"
                          value={search[name] || ""}
                          onChange={changeSearch}
                        />
                      </Grid>
                    )
                )}
              </Grid>
              <Grid
                container
                direction="row"
                spacing={2}
                style={{ padding: 10 }}
              >
                <Grid item xs={6}>
                  <Button
                    color="primary"
                    variant="contained"
                    style={{ marginRight: 10 }}
                    onClick={() => setFilter(search)}
                  >
                    Filtrar
                  </Button>
                  <Button
                    color="primary"
                    variant="outlined"
                    onClick={() => {
                      setFilter({});
                      setSearch({});
                      onClose();
                    }}
                  >
                    Reiniciar
                  </Button>
                </Grid>
              </Grid>
              {/* </fieldset> */}
            </>
          </Grid>
        </Modal>
      )}
    </>
  );
}

ToolBar.propTypes = {
  title: PropTypes.string,
  ExtraToolBar: PropTypes.node,
  columns: PropTypes.oneOfType([PropTypes.array]),
  filters: PropTypes.oneOfType([PropTypes.object]),
  setFilter: PropTypes.func,
  onCreate: PropTypes.func,
  disableCreateButton: PropTypes.bool,
  createPermissions: PropTypes.string,
};

export default ToolBar;
