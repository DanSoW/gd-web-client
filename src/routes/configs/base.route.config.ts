import IRouteModel from "src/models/IRouteModel";
import Main from "src/containers/Main";

const baseRouteConfig: IRouteModel[] = [
    {
        // URL: /
        path: '/',
        element: Main
    },
];

export default baseRouteConfig;