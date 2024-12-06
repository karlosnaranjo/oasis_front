import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { ExpandMore, Check, Close } from "@mui/icons-material";

const InterfaceResultModal = ({ open, onClose, data }) => {
  const { files, report } = data;

  // Función para renderizar los errores como elementos de lista
  const renderReport = (items) => (
    <Accordion key="files">
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls={`panel-report-content`}
        id={`panel-report-header`}
      >
        <Typography>Reporte de Interface</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List>
          {items.map((item, index1) => (
            <React.Fragment key={index1}>
              {item.map((msg, index2) => (
                <ListItem key={`${index1}-${index2}`}>
                  <ListItemText primary={msg} />
                </ListItem>
              ))}
            </React.Fragment>
          ))}
        </List>
      </AccordionDetails>
    </Accordion>
  );

  const renderIcon = (value) => {
    return value ? <Check /> : <Close />;
  };

  // Función para renderizar cada acordeón con sus detalles y errores
  const renderFiles = (items) => (
    <Accordion key="files">
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls={`panel-files-content`}
        id={`panel-files-header`}
      >
        <Typography>Archivos Importados</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre de Archivo</TableCell>
                <TableCell>Estructura</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((detalle, idx) => (
                <TableRow key={idx}>
                  <TableCell>{detalle.file}</TableCell>
                  <TableCell>{renderIcon(detalle.structure)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </AccordionDetails>
    </Accordion>
  );

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Fin del Proceso</DialogTitle>
      <DialogContent>
        {renderFiles(files)}
        {renderReport(report)}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InterfaceResultModal;
