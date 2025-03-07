import PropTypes from "prop-types";
import { useState } from "react";
import { Icon } from "@iconify/react";
import {
  NavLink as RouterLink,
  matchPath,
  useLocation,
} from "react-router-dom";
import arrowIosForwardFill from "@iconify/icons-eva/arrow-ios-forward-fill";
import arrowIosDownwardFill from "@iconify/icons-eva/arrow-ios-downward-fill";
// material
import { alpha, useTheme, styled } from "@mui/material/styles";
import {
  Box,
  List,
  Collapse,
  ListItemText,
  ListItemIcon,
  ListSubheader,
  ListItemButton,
} from "@mui/material";
import useAuth from "hooks/useAuth";

// ----------------------------------------------------------------------

const ListSubheaderStyle = styled((props) => (
  <ListSubheader disableSticky disableGutters {...props} />
))(({ theme }) => ({
  ...theme.typography.overline,
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(0),
  paddingLeft: theme.spacing(1.5),
  color: theme.palette.text.primary,
}));

const ListItemStyle = styled(ListItemButton)(
  ({ theme, pad: { paddingLeft = 0 } = {} }) => ({
    ...theme.typography.body2,
    height: 38,
    position: "relative",
    textTransform: "capitalize",
    paddingLeft: theme.spacing(2.5 + paddingLeft ?? 0),
    paddingRight: theme.spacing(2.5),
    color: theme.palette.text.secondary,
    "&:before": {
      top: 0,
      right: 0,
      width: 3,
      bottom: 0,
      content: "''",
      display: "none",
      position: "absolute",
      borderTopLeftRadius: 4,
      borderBottomLeftRadius: 4,
      backgroundColor: theme.palette.primary.main,
    },
  })
);

const ListItemIconStyle = styled(ListItemIcon)({
  width: 22,
  height: 22,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

// ----------------------------------------------------------------------

NavItem.propTypes = {
  isShow: PropTypes.bool,
  depth: PropTypes.number.isRequired,
  item: PropTypes.object,
};

function NavItem({ item, isShow, depth }) {
  const theme = useTheme();
  const { pathname } = useLocation();
  const { title, path, icon, info, children, permissions } = item;
  const isActiveRoot = path
    ? !!matchPath({ path, end: false }, pathname)
    : false;
  const [open, setOpen] = useState(isActiveRoot);
  const { checkAccess } = useAuth();

  const handleOpen = () => {
    setOpen(!open);
  };

  let paddingLeft = 0;
  if (depth > 0) {
    paddingLeft = 2 * depth;
  }

  const style = { paddingLeft };

  const activeRootStyle = {
    color: "primary.main",
    fontWeight: "fontWeightMedium",
    bgcolor: alpha(
      theme.palette.primary.main,
      theme.palette.action.selectedOpacity
    ),
    "&:before": { display: "block" },
  };

  const activeSubStyle = {
    color: "text.primary",
    fontWeight: "fontWeightMedium",
  };

  if (children) {
    return checkAccess(permissions) ? (
      <>
        <ListItemStyle
          onClick={handleOpen}
          pad={style}
          sx={{
            ...(isActiveRoot && activeRootStyle),
          }}
        >
          <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
          {isShow && (
            <>
              <ListItemText disableTypography primary={title} />
              {info && info}
              <Box
                component={Icon}
                icon={open ? arrowIosDownwardFill : arrowIosForwardFill}
                sx={{ width: 16, height: 16, ml: 1 }}
              />
            </>
          )}
        </ListItemStyle>

        {isShow && (
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {children.map((item) => {
                const { title, path, children } = item;
                const isActiveSub = path
                  ? !!matchPath({ path, end: false }, pathname)
                  : false;
                if (children) {
                  return (
                    <NavItem
                      key={item.title}
                      item={item}
                      isShow={isShow}
                      depth={depth + 1}
                    />
                  );
                }
                return checkAccess(permissions) ? (
                  <ListItemStyle
                    key={title}
                    component={RouterLink}
                    pad={style}
                    to={path}
                    sx={{
                      ...(isActiveSub && activeSubStyle),
                    }}
                  >
                    <ListItemIconStyle>
                      <Box
                        component="span"
                        sx={{
                          width: 4,
                          height: 4,
                          display: "flex",
                          borderRadius: "50%",
                          alignItems: "center",
                          justifyContent: "center",
                          bgcolor: "text.disabled",
                          transition: (theme) =>
                            theme.transitions.create("transform"),
                          ...(isActiveSub && {
                            transform: "scale(2)",
                            bgcolor: "primary.main",
                          }),
                        }}
                      />
                    </ListItemIconStyle>
                    <ListItemText disableTypography primary={title} />
                  </ListItemStyle>
                ) : (
                  <></>
                );
              })}
            </List>
          </Collapse>
        )}
      </>
    ) : (
      <></>
    );
  }

  return (
    <ListItemStyle
      component={RouterLink}
      to={path}
      pad={style}
      sx={{
        ...(isActiveRoot && activeRootStyle),
      }}
    >
      <ListItemIconStyle>{icon && icon}</ListItemIconStyle>
      {isShow && (
        <>
          <ListItemText disableTypography primary={title} />
          {info && info}
        </>
      )}
    </ListItemStyle>
  );
}

NavSection.propTypes = {
  isShow: PropTypes.bool,
  navConfig: PropTypes.array,
};

export default function NavSection({ navConfig, isShow = true, ...other }) {
  return (
    <Box {...other}>
      {navConfig.map((list) => {
        const { subheader, items } = list;
        return (
          <List key={`${subheader}-`} disablePadding>
            {isShow && <ListSubheaderStyle>{subheader}</ListSubheaderStyle>}
            {items.map((item) => (
              <NavItem key={item.title} item={item} isShow={isShow} depth={0} />
            ))}
          </List>
        );
      })}
    </Box>
  );
}
