import React, { useEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import "../../App.css";
import { Link } from "react-router-dom";
import {
  Card,
  Typography,
  IconButton,
  Grid,
  Chip,
  Box,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import QuantityToProduceForm from "../../pages/transactions/production_planning/quantityToProgram";
import ProductionPlanningInfo from "../../pages/transactions/production_planning/info";
import {
  Info,
  CommentBank,
  AttachFile,
  PrecisionManufacturing,
  MoreVert,
} from "@mui/icons-material";
import endPoints from "../../endPoints/endPoints";
import { ImagePreview } from "../../components";
import Badge from "@mui/material/Badge";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import CloseIcon from "@mui/icons-material/Close";
import { withApi } from "wrappers";

// Identificador único para el tipo de objeto draggable
const ItemType = "CARD";

const TaskDnD = ({
  id,
  content,
  index,
  priority,
  updateDepositId,
  updatePriority,
  depositId,
  showCompactCards,
  depositWidth,
  setReloadPage,
  doGet,
  doPut,
}) => {
  const { id: content_id } = content;
  const [openQuantityProduceModal, setOpenQuantityProduceModal] =
    useState(false);
  const [openModalAttach, setOpenModalAttach] = useState(false);
  const [openModalComments, setOpenModalComments] = useState(false);
  const [openModalInfo, setOpenModalInfo] = useState(false);
  const [idPlanningToEdit, setIdPlanningToEdit] = useState(null);
  const [openModalImage, setOpenModalImage] = useState(false);
  const [tags, setTags] = useState([]);
  const [productionStates, setProductionStates] = useState([]);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [contentState, setContentState] = useState({
    description: content.production_state_description,
    color: content.production_state_color,
  });
  const [reloadCard, setReloadCard] = useState(false);
  const cardHeight = showCompactCards ? "120px" : "170px";
  //const cardWidth = depositId == 0 ? "270px" : "px";
  const [hasChanges, setHasChanges] = useState(false);

  // la lista de tags puede ser para la orden de trabajo que aun
  // esta en pendientes (work order)  o para la Tarjeta asignada a
  // un modulo (Production planning)
  const url_tags =
    content.id === null ? "work_order_tag" : "production_planning_tag";
  const id_tags = content.id === null ? content.work_order_id : content.id;

  const url = `${endPoints.masters.productImages.image}/${content.image_path}`;

  const handleOpenMenu = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setMenuAnchorEl(null);
  };

  const handleOpenModalInfo = (idPlanning, focusSection) => {
    setIdPlanningToEdit(idPlanning);
    setOpenModalInfo({ open: true, focusSection });
  };

  const handleCloseModalInfo = () => {
    setIdPlanningToEdit(null);
    setOpenModalInfo({ open: false, focusSection: null });
    if (hasChanges) {
      setReloadPage(true);
    }
    console.log("Recargar la tarjeta");
  };

  const handleOpenModalImage = () => {
    setOpenModalImage(true);
  };
  const handleCloseModalImage = () => {
    setOpenModalImage(false);
  };

  // abrir el formulario de productos en una nueva pestaña
  const editProduct = (event) => {
    event.preventDefault();
    const urlFormulario = `/app/general/masters/products/edit/${content.product_id}`;
    window.open(urlFormulario, "_blank");
  };

  // abrir el formulario de Orden de trabajo en una nueva pestaña
  const editWorkOrder = (event) => {
    event.preventDefault();
    const urlFormulario = `/app/general/transactions/work_orders/edit/${content.work_order_id}`;
    window.open(urlFormulario, "_blank");
  };

  const handleChangeState = async (
    contentId,
    stateId,
    stateDescription,
    stateColor
  ) => {
    try {
      const params = {
        url: `production_planning/changeproductionstate/${contentId}/${stateId}`,
      };

      const response = await doPut(params); // Reemplazamos fetch con doPut
      if (response) {
        console.log("Estado cambiado exitosamente");
        setMenuAnchorEl(null); // Cierra el menú contextual
        setContentState({ description: stateDescription, color: stateColor });
      } else {
        console.error("Error al cambiar el estado");
      }
    } catch (error) {
      console.error("Error de red:", error);
    }
  };

  useEffect(() => {
    if (!openQuantityProduceModal) {
      setIdPlanningToEdit(null);
    }
  }, [openQuantityProduceModal]);

  useEffect(() => {
    // Fetch para obtener los tags y production states, ahora reemplazado por doGet
    const fetchTagsAndStates = async () => {
      try {
        const tagsParams = {
          url: `${url_tags}?id=${id_tags}`,
        };
        const tagsData = await doGet(tagsParams); // Reemplazamos fetch con doGet
        setTags(tagsData.response.data);

        const statesParams = {
          url: `production_states/list`,
        };
        const statesData = await doGet(statesParams); // Reemplazamos fetch con doGet
        setProductionStates(statesData.response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchTagsAndStates();
  }, [doGet]);

  // busca los calculos de la ordend e trabajo actual
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType,
    item: { content_id, id, index, priority, depositId },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  // Configuración de drop para reordenar tarjetas
  const [, drop] = useDrop({
    accept: ItemType,
    drop: (draggedItem) => {
      console.log("DROP TASK", draggedItem, id);
      if (draggedItem.id !== id) {
        console.log(
          draggedItem.content_id,
          "Moviendo el ",
          draggedItem.depositId,
          "Prioridad ",
          draggedItem.priority,
          "SOBRE Priority ",
          content.priority,
          "deposito destino",
          content.plant_layout_id
        );

        // si el deposito de origen y destino son diferentes, no cambiamos prioridad, movemos la tarjeta
        if (content.plant_layout_id != draggedItem.depositId) {
          updateDepositId(draggedItem.id, content.plant_layout_id);
        } else {
          updatePriority(
            draggedItem.content_id,
            draggedItem.depositId,
            draggedItem.priority,
            content.priority
          );
        }
      }
    },
  });

  // Combina las referencias de drag y drop
  const ref = React.useRef(null);
  drag(drop(ref));
  //drag(ref);

  let allComments = [];

  // Recorriendo production_planning_details y acumulando comentarios
  /*  content.work_order_details.forEach((detail) => {
    allComments = allComments.concat(
      detail.production_planning_details.map(
        (plan) => plan.production_planning.production_planning_comments
      )
    );
  }); */

  // Aplanando el array de comentarios
  allComments = allComments.flat();

  return (
    <>
      {Boolean(openModalInfo.open) && (
        <ProductionPlanningInfo
          id={idPlanningToEdit}
          content={content}
          setOpenModal={handleCloseModalInfo}
          setReloadPage={setReloadPage}
          focusSection={openModalInfo.focusSection}
          setHasChanges={setHasChanges}
        />
      )}
      {Boolean(openModalImage) && (
        <Dialog
          open={openModalImage}
          onClose={() => setOpenModalImage(false)}
          sx={{
            width: "80vw",
            height: "80vh",
          }}
        >
          <IconButton
            aria-label="close"
            onClick={() => setOpenModalImage(false)}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent>
            <Typography variant="h6" align="center" gutterBottom>
              Vista de imagen original
            </Typography>
            <ImagePreview
              //className="ImagePlanner"
              sx={{
                height: "100%",
                width: "auto",
                margin: "auto",
                display: "flex",
              }}
              url={url}
              downloadUrl={url}
            />
          </DialogContent>
        </Dialog>
      )}
      {/* <Badge
        badgeContent={content.priority}
        color="warning"
        style={{
          marginRight: "10px",
        }}
      > */}
      <Card
        style={{
          borderLeft: "5px solid " + content.plant_hex,
          margin: "2px",
          paddingTop: "10px",
          height: cardHeight,
          backgroundColor: contentState.color || "transparent",
          overflow: "hidden",
        }}
        ref={ref}
        sx={{ border: isDragging ? "5px solid SteelBlue" : "", padding: 2 }}
      >
        <Grid container>
          {/* Primera columna */}
          <Grid item xs={9}>
            {/* Primera fila en la primera columna */}
            <Grid container direction="column">
              <Grid
                item
                onClick={() => {
                  handleOpenModalInfo(content.id, "all");
                }}
              >
                <table width="100%">
                  <tbody>
                    <tr>
                      <td colSpan="4">
                        <Link to="#" onClick={editWorkOrder}>
                          <Typography variant="subtitle1">
                            OP:{content.order_number}
                          </Typography>
                        </Link>
                      </td>
                      <td colSpan="2" align="center">
                        <Box>
                          <Typography
                            variant="body2"
                            sx={{
                              color: "blue",
                              display: "block",
                              lineHeight: 1,
                            }}
                          >
                            {content.efficiency
                              ? `Ef:${content.efficiency}%`
                              : ""}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{
                              color: "red",
                              marginTop: 0,
                              display: "block",
                              lineHeight: 1,
                            }} // Ajusta el margen superior
                          >
                            {content.is_partial ? content.sizes : ""}
                          </Typography>
                        </Box>
                      </td>
                    </tr>
                    <tr>
                      <td
                        colSpan="6"
                        style={{
                          maxWidth: "200px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        <Tooltip
                          title={
                            <React.Fragment>
                              <Typography variant="body1">
                                REF: {content.code.substring(0, 30)}
                              </Typography>
                              <Typography variant="body1">
                                DESC: {content.description}
                              </Typography>
                            </React.Fragment>
                          }
                        >
                          <React.Fragment>
                            <Link to="#" onClick={editProduct}>
                              <Typography variant="body2">
                                {content.code.substring(0, 50)} ({content.sam})
                              </Typography>
                            </Link>
                          </React.Fragment>
                        </Tooltip>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="1">
                        <Typography variant="subtitle2">Cant:</Typography>
                        <Typography variant="h6">
                          {content.total_qty}
                        </Typography>
                      </td>
                      <td colSpan="2">
                        <Typography variant="subtitle2">Prod:</Typography>
                        <Typography variant="h6">
                          {content.total_prd}
                        </Typography>
                      </td>
                      <td colSpan="1">
                        <Typography variant="subtitle2">Pend:</Typography>
                        <Typography variant="h6">
                          {content.total_qty - content.total_prd}
                        </Typography>
                      </td>
                      <td colSpan="2">
                        <Tooltip
                          title={
                            <React.Fragment>
                              <Typography variant="subtitle2">
                                Días W:{" "}
                              </Typography>
                              <Typography variant="body2">
                                {Number(content.working_days).toLocaleString(
                                  "en-US",
                                  {
                                    minimumFractionDigits: 1,
                                    maximumFractionDigits: 1,
                                  }
                                )}
                              </Typography>
                              <Typography variant="subtitle2">
                                Horas W:{" "}
                              </Typography>
                              <Typography variant="body2">
                                {Number(content.working_hours).toLocaleString(
                                  "en-US",
                                  {
                                    minimumFractionDigits: 1,
                                    maximumFractionDigits: 1,
                                  }
                                )}
                              </Typography>
                            </React.Fragment>
                          }
                        >
                          <Typography variant="subtitle2">U/día: </Typography>
                          <Typography variant="h6">
                            {" "}
                            {Number(content.units_per_day).toLocaleString(
                              "en-US",
                              {
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0,
                              }
                            )}
                          </Typography>
                        </Tooltip>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Grid>
              {/* Segunda fila en la primera columna */}
              <Grid item>
                <table width="100%">
                  <tbody>
                    <tr>
                      <td width="60%">
                        <>
                          <Tooltip
                            title="Archivos Adjuntos"
                            style={{ width: "30px", marginTop: "15px" }}
                          >
                            <Badge
                              badgeContent={content.total_attachments}
                              color="primary"
                            >
                              <IconButton
                                onClick={() =>
                                  handleOpenModalInfo(content.id, "attachments")
                                }
                              >
                                <AttachFile style={{ width: "20px" }} />
                              </IconButton>
                            </Badge>
                          </Tooltip>
                          <Tooltip
                            title="Comentarios"
                            style={{ width: "30px", marginTop: "15px" }}
                          >
                            <Badge
                              badgeContent={content.total_comments}
                              color="primary"
                            >
                              <IconButton
                                onClick={() =>
                                  handleOpenModalInfo(content.id, "comments")
                                }
                              >
                                <CommentBank style={{ width: "20px" }} />
                              </IconButton>
                            </Badge>
                          </Tooltip>
                          <Tooltip
                            title="Producción"
                            style={{ width: "30px", marginTop: "15px" }}
                          >
                            <Badge
                              badgeContent={content.production_count}
                              color="primary"
                            >
                              <IconButton
                                onClick={() =>
                                  handleOpenModalInfo(content.id, "production")
                                }
                              >
                                <PrecisionManufacturing
                                  style={{ width: "20px" }}
                                />
                              </IconButton>
                            </Badge>
                          </Tooltip>
                        </>
                      </td>
                      <td width="40%">
                        {tags.length > 0 && (
                          <div
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                              gap: "2px",
                              lineHeight: "1",
                            }}
                          >
                            {tags.map((tag, index) =>
                              // Mostrar solo los dos primeros tags como Chips independientes
                              index < 2 ? (
                                <Tooltip key={index} title={tag.description}>
                                  <Chip
                                    label={tag.description}
                                    style={{
                                      backgroundColor: tag.color,
                                      color: "white",
                                      marginRight: "3px",
                                      height: "15px",
                                      marginTop: "0px",
                                      marginBottom: "0px",
                                    }}
                                  />
                                </Tooltip>
                              ) : null
                            )}
                            {tags.length > 2 && (
                              // Mostrar un botón adicional si hay más de dos tags
                              <Tooltip
                                title={
                                  <React.Fragment>
                                    {tags.slice(2).map((tag, index) => (
                                      <div key={index}>{tag.description}</div>
                                    ))}
                                  </React.Fragment>
                                }
                              >
                                <Chip
                                  label={tags.length - 2 + "+"}
                                  style={{
                                    backgroundColor: "gray",
                                    color: "black",
                                    marginRight: "3px",
                                    height: "15px",
                                    marginTop: "0px",
                                    marginBottom: "0px",
                                  }}
                                />
                              </Tooltip>
                            )}
                          </div>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Grid>
            </Grid>
          </Grid>

          {/* Segunda columna */}
          <Grid item xs={3}>
            <>
              <Tooltip
                title={contentState.description}
                style={{ align: "right" }}
              >
                <IconButton
                  onClick={handleOpenMenu}
                  style={{
                    backgroundColor: contentState.color || "transparent",
                    width: "10px",
                    height: "10px",
                  }}
                >
                  <MoreVert />
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={menuAnchorEl}
                open={Boolean(menuAnchorEl)}
                onClose={handleCloseMenu}
              >
                {productionStates.map((state) => (
                  <MenuItem
                    key={state.id}
                    onClick={() =>
                      handleChangeState(
                        content.id,
                        state.id,
                        state.description,
                        state.color
                      )
                    }
                  >
                    <ListItemIcon>
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          backgroundColor: state.color,
                          borderRadius: "50%",
                          marginRight: 1,
                        }}
                      />
                      <ListItemText>{state.description}</ListItemText>
                    </ListItemIcon>
                  </MenuItem>
                ))}
              </Menu>
            </>
            {Boolean(content.image_path) && (
              <>
                <ImagePreview
                  className="ImagePlanner"
                  url={url}
                  downloadUrl={url}
                  onClick={handleOpenModalImage}
                />
              </>
            )}
          </Grid>
        </Grid>

        {openQuantityProduceModal && (
          <QuantityToProduceForm
            id={idPlanningToEdit}
            setOpenModal={setOpenQuantityProduceModal}
          />
        )}
      </Card>
      {/* </Badge> */}
    </>
  );
};

export default withApi(TaskDnD);
