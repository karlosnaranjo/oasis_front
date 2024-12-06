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
  const { files, products, orders, images, attachments } = data;

  // ! PRODUCTOS
  const renderProducts = (items) => (
    <Accordion key="files">
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls={`panel-report-content`}
        id={`panel-report-header`}
      >
        <Typography>Productos</Typography>
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

  // ! ORDENES
  const renderOrders = (items) => (
    <Accordion key="files">
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls={`panel-report-content`}
        id={`panel-report-header`}
      >
        <Typography>Ordenes de trabajo</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List>
          {items.map((item, index1) => (
            <React.Fragment key={index1}>
              {item.map((msg, index2) => (
                <React.Fragment key={index2}>
                  {msg.errors.map((txt, index3) => (
                    <ListItem key={`${index1}-${index2}-${index3}`}>
                      <ListItemText primary={txt} />
                    </ListItem>
                  ))}
                </React.Fragment>
              ))}
            </React.Fragment>
          ))}
        </List>
      </AccordionDetails>
    </Accordion>
  );

  // ! IMAGENES Y ADJUNTOS
  const renderAttachments = (items, title) => (
    <Accordion key="files">
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls={`panel-report-content`}
        id={`panel-report-header`}
      >
        <Typography>{title}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List>
          {items.map((item, index1) => (
            <React.Fragment key={index1}>
              <ListItem key={`${index1}`}>
                <ListItemText primary={item} />
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      </AccordionDetails>
    </Accordion>
  );

  const renderIcon = (value) => {
    return value ? <Check /> : <Close />;
  };

  // ! CSV IMPORTADOS
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
    <Dialog fullWidth open={open} onClose={onClose} maxWidth="xl">
      <DialogTitle>Fin del Proceso</DialogTitle>
      <DialogContent>
        {renderFiles(files)}
        {renderProducts(products)}
        {renderOrders(orders)}
        {renderAttachments(images, "Imágenes de productos")}
        {renderAttachments(attachments, "Adjuntos de Ordenes de Trabajo")}
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
