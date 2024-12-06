import DepositDnD from "./DepositDnD";
import { useState, useEffect } from "react";
import { Grid, Paper, useTheme } from "@mui/material";
//import { styled } from "@material-ui/system";

import "../../App.css";
import endPoints from "endPoints/endPoints";
import { withApi, withNotification } from "wrappers";

function KanbanBoard({
  modules,
  warningLevels,
  orders,
  doPut,
  reloadPage,
  setReloadPage,
  showCompactCards,
}) {
  // Clonar el estado actual antes de modificarlo para mantener la inmutabilidad
  const newDeposits = [...modules];
  //newDeposits.unshift(inbox);
  const [deposits, setDeposits] = useState([]);
  const theme = useTheme();

  const [WorkOrders, setWorkOrders] = useState([]);
  useEffect(() => {
    setWorkOrders(orders);
    setDeposits(newDeposits);
  }, [setDeposits, modules, setWorkOrders, WorkOrders, reloadPage]);

  const updateOrder = async (order_id, deposit_id) => {
    const url = `${endPoints.transactions.productionPlanning.move}/${order_id}`;
    const data = { plant_layout_id: deposit_id };
    await doPut({ url, data });
  };

  const ChangePriority = async (
    id,
    deposit_id,
    current_priority,
    new_priority
  ) => {
    /* console.log(
      "CHANGE PRIORITY",
      id,
      deposit_id,
      current_priority,
      new_priority
    ); */
    const url = `${endPoints.transactions.productionPlanning.changePriority}/${id}`;
    const data = {
      plant_layout_id: deposit_id,
      current_priority: current_priority,
      new_priority: new_priority,
    };
    await doPut({ url, data });
  };

  const updateDepositId = (task_id, newDepositId) => {
    console.log("Mover tarea", task_id, "al deposito", newDepositId);
    updateOrder(task_id, newDepositId);
    setReloadPage(true);
  };

  const updatePriority = (id, deposit_id, current_priority, new_priority) => {
    ChangePriority(id, deposit_id, current_priority, new_priority);
    setReloadPage(true);
  };

  return (
    <>
      <Paper
        className="Board"
        style={{
          /*height: "100%",*/
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Grid container direction="column">
          <Grid item className="BoardPending" xs={12}>
            {deposits.map((deposit) =>
              deposit.id === 0 ? (
                <DepositDnD
                  id={deposit.id || 0}
                  info={deposit}
                  work={WorkOrders}
                  warningLevels={warningLevels}
                  updateDepositId={updateDepositId}
                  updatePriority={updatePriority}
                  showCompactCards={showCompactCards}
                  style={{ width: "100%", height: "100%" }}
                  setReloadPage={setReloadPage}
                />
              ) : null
            )}
          </Grid>
          <Grid container className="BoardModule">
            {deposits.map(
              (deposit) =>
                deposit.id !== 0 && (
                  <DepositDnD
                    id={deposit.id || 0}
                    info={deposit}
                    work={WorkOrders}
                    warningLevels={warningLevels}
                    updateDepositId={updateDepositId}
                    updatePriority={updatePriority}
                    showCompactCards={showCompactCards}
                    setReloadPage={setReloadPage}
                  />
                )
            )}
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}

export default withApi(withNotification(KanbanBoard));
