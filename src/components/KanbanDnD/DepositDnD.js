import React, { useEffect, useState } from "react";
import TaskDnD from "./TaskDnD";
import { useDrop } from "react-dnd";
import { Paper, Tooltip, Typography, Box, Grid, useTheme } from "@mui/material";
import PlantLayoutForm from "../../pages/masters/plants/Form";
import EventIcon from "@mui/icons-material/Event";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { getContrastText } from "../../utils/colorUtils";

const ItemType = "CARD";

const DepositDnD = ({
  id,
  info,
  work,
  warningLevels,
  updateDepositId,
  updatePriority,
  showCompactCards,
  setReloadPage,
}) => {
  const theme = useTheme();
  const [openQuantityProduceModal, setOpenPlantModal] = useState(false);
  const [idPlanningToEdit, setIdPlantToEdit] = useState(null);

  const handleOpenModal = (idPlanning) => {
    setIdPlantToEdit(idPlanning);
    setOpenPlantModal(true);
  };

  const moveCard = (dragIndex, hoverIndex, para) => {
    //const dragCard = cards[dragIndex];
    //const updatedCards = [...cards];
    //updatedCards.splice(dragIndex, 1);
    //updatedCards.splice(hoverIndex, 0, dragCard);
    // setCards(updatedCards);
    //updateDepositId(task.id, id);
  };

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemType,
    drop: (task) => {
      if (task.depositId == id) {
        return;
      }
      console.log("DROP DEPOSIT", task, id);
      updateDepositId(task.id, id);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const filterTasksByDeposit = (plant_id) => {
    const datosFiltrados = work.filter(
      (item) => item.plant_layout_id === plant_id
    );
    return datosFiltrados;
  };

  // Acumular el valor total de dias
  const totalDiasW = filterTasksByDeposit("" + id).reduce(
    (accumulator, task) => accumulator + task.working_days,
    0
  );
  // Acumular el valor total de Horas
  const totalHorasW = filterTasksByDeposit("" + id).reduce(
    (accumulator, task) => accumulator + task.working_hours,
    0
  );

  const getBackgroundColor = (totalDiasW) => {
    for (const level of warningLevels) {
      if (totalDiasW >= level.from && totalDiasW < level.to) {
        return level.color;
      }
    }
    return "transparent"; // color por defecto si no se encuentra en ningún rango
  };

  return (
    <Paper
      key={id}
      className={id == 0 ? "DepositPending" : "DepositModule"}
      ref={drop}
      elevation={3}
      style={{
        width: id == 0 ? "100%" : "340px",
        height: id == 0 ? "100%" : "800px",
        padding: "3px",
        boxShadow: `2px 2px 6px ${theme.palette.primary.light}`,
        backgroundColor: isOver ? "LightSteelBlue" : "WhiteSmoke",
        borderTop: `5px solid ${info.color}`,
      }}
    >
      <Grid container spacing={1}>
        {id == 0 && (
          <>
            <Grid
              item
              xs={12}
              style={{
                borderTop: "5px solid " + info.color,
                // color: "white",
              }}
            >
              <Typography variant="h5">
                {id}-{info.description}
              </Typography>
            </Grid>
          </>
        )}

        {id > 0 && (
          <>
            <Grid item xs={10} md={10} xl={10}>
              <Grid
                container
                spacing={1}
                style={{
                  borderTop: "5px solid " + info.color,
                  // color: "white",
                }}
                onClick={() => handleOpenModal(id)}
              >
                <Grid item xs={12}>
                  <Typography variant="h5">
                    {id}-{info.description}
                  </Typography>
                </Grid>

                <Grid item xs={4}>
                  <Box display="flex" alignItems="center">
                    <PeopleAltIcon />
                    <Typography
                      variant="h6"
                      component="span"
                      marginLeft={1}
                      display="inline"
                    >
                      {info.headcount}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={4}>
                  <Box display="flex" alignItems="center">
                    <AccessTimeIcon />
                    <Typography
                      variant="h6"
                      component="span"
                      marginLeft={1}
                      display="inline"
                    >
                      {Number(totalHorasW).toLocaleString("en-US", {
                        minimumFractionDigits: 1,
                        maximumFractionDigits: 1,
                      })}
                    </Typography>
                  </Box>
                </Grid>

                <Grid item xs={4}>
                  <Box display="flex" alignItems="center">
                    <TrendingUpIcon />
                    <Typography
                      variant="h6"
                      component="span"
                      marginLeft={1}
                      display="inline"
                    >
                      {info.efficiency}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={2} md={2} xl={2}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                style={{
                  backgroundColor: getBackgroundColor(totalDiasW),
                  color: getContrastText(getBackgroundColor(totalDiasW)),
                  width: 50,
                  height: 50,
                  borderRadius: "50%",
                  margin: "10px 20px 0px 0px",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
                }}
              >
                <Tooltip
                  title="Dias de trabajo con las órdenes asignadas"
                  arrow
                >
                  {/* <EventIcon style={{ marginRight: "auto" }} /> */}

                  <Typography
                    variant="h6"
                    component="span"
                    marginLeft={1}
                    display="inline"
                  >
                    {Number(totalDiasW).toLocaleString("en-US", {
                      minimumFractionDigits: 1,
                      maximumFractionDigits: 1,
                    })}
                  </Typography>
                </Tooltip>
              </Box>
            </Grid>
          </>
        )}
      </Grid>
      {openQuantityProduceModal && (
        <PlantLayoutForm
          id={idPlanningToEdit}
          setOpenModal={setOpenPlantModal}
        />
      )}
      {filterTasksByDeposit("" + id).map((task, index) => (
        <Grid
          item
          xs={id == 0 ? 12 : 12}
          sm={id == 0 ? 6 : 12}
          md={id == 0 ? 3 : 12}
          lg={id == 0 ? 1.5 : 12}
          xl={id == 0 ? 1.5 : 12}
          key={`${task.work_order_id}-${task.work_order_detail_id}-${
            task.id || 0
          }`}
        >
          <TaskDnD
            key={task.work_order_detail_id}
            id={`${task.work_order_id}-${task.id || 0}`}
            content={task}
            index={index}
            priority={task.priority}
            updateDepositId={updateDepositId}
            updatePriority={updatePriority}
            depositId={id}
            showCompactCards={showCompactCards}
            setReloadPage={setReloadPage}
          />
        </Grid>
      ))}
    </Paper>
  );
};

export default DepositDnD;
