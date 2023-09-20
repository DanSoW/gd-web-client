import IRouteModel from "src/models/IRouteModel";
import SignIn from "src/containers/Auth/SignIn";
import SignUp from "src/containers/Auth/SignUp";

const authRouteConfig: IRouteModel[] = [
    {
        // URL: /
        path: '/auth/sign-in',
        element: SignIn
    },
    {
        // URL: /
        path: '/auth/sign-up',
        element: SignUp
    }
];

export default authRouteConfig;