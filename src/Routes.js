import { createAppContainer} from "react-navigation"
import { createStackNavigator } from "react-navigation-stack"
import Home from "./Home";
import QRCodeScannerScreen from "./QRCodeScannerScreen";
import QRCodeData from "./QRCodeData";

const mainStack = createStackNavigator(
    {
        Home: Home,
        QRCodeScannerScreen: QRCodeScannerScreen,
        QRCodeData: QRCodeData
    },
    { defaultNavigationOptions: { headerShown: false }} // We don't need a Header Bar for this app
);

const AppContainer = createAppContainer(mainStack);

export default AppContainer;