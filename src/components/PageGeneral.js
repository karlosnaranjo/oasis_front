import PropTypes from "prop-types";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { forwardRef, useEffect, useCallback } from "react";
// material
import { Box, Typography, Card } from "@mui/material";
// utils
import Header from "components/breadcrumbs";
import track from "utils/analytics";

const PageGeneral = forwardRef(
  ({ children, title = "", withOutCard, breadcrumbs, sx, ...other }, ref) => {
    const { pathname } = useLocation();

    const sendPageViewEvent = useCallback(() => {
      track.pageview({
        page_path: pathname,
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      sendPageViewEvent();
    }, [sendPageViewEvent]);

    return (
      <Box ref={ref} {...other}>
        <Helmet>
          <title>{title}</title>
        </Helmet>
        <Box
          sx={{
            p: 2,
            ...sx,
          }}
        >
          <Header breadcrumbs={breadcrumbs} />
          <Typography variant="h6" color="textPrimary">
            {title}
          </Typography>
        </Box>
        {withOutCard ? (
          <>{children}</>
        ) : (
          <Card sx={{ overflow: "unset", position: "unset", width: "100%" }}>
            <Box
              sx={{
                p: 1,
                minHeight: 200,
                ...sx,
              }}
            >
              {children}
            </Box>
          </Card>
        )}
      </Box>
    );
  }
);

PageGeneral.defaultProps = {
  withOutCard: false,
};

PageGeneral.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  withOutCard: PropTypes.bool,
  sx: PropTypes.object,
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      path: PropTypes.string,
    })
  ).isRequired,
};

export default PageGeneral;
