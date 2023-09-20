import IRouteModel from "src/models/IRouteModel";
import Admin from "src/containers/Admin/Admin";

const adminRouteConfig: IRouteModel[] = [
    {
        // URL: /
        path: '/admin',
        element: Admin
    },
];

export default adminRouteConfig;