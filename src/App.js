// routes
import Router from "./routes";
// theme
import ThemeConfig from "./theme";
import GlobalStyles from "./theme/globalStyles";
// hooks
import useAuth from "./hooks/useAuth";
// components
import Settings from "./components/settings";
import RtlLayout from "./components/RtlLayout";
import ScrollToTop from "./components/ScrollToTop";
import NotistackProvider from "./components/NotistackProvider";
import ThemePrimaryColor from "./components/ThemePrimaryColor";
import ThemeLocalization from "./components/ThemeLocalization";
import { BaseOptionChartStyle } from "./components/charts/BaseOptionChart";
import LoadingScreen, { ProgressBarStyle } from "./components/LoadingScreen";

// Imports for Planning form (KanbanBoard Components)
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
//import KanbanBoard from "./components/KanbanDnD/KanbanBoard";

// ----------------------------------------------------------------------

export default function App() {
  const { isInitialized } = useAuth();

  return (
    <DndProvider backend={HTML5Backend}>
      <ThemeConfig>
        <ThemePrimaryColor>
          <ThemeLocalization>
            <RtlLayout>
              <NotistackProvider>
                <GlobalStyles />
                <ProgressBarStyle />
                <BaseOptionChartStyle />
                <Settings />
                <ScrollToTop />
                {/* <GoogleAnalytics /> */}
                {isInitialized ? <Router /> : <LoadingScreen />}
              </NotistackProvider>
            </RtlLayout>
          </ThemeLocalization>
        </ThemePrimaryColor>
      </ThemeConfig>
    </DndProvider>
  );
}
