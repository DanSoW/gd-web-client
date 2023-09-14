/* Библиотеки */
import { Routes, Route, Navigate } from "react-router-dom";
import { useCallback } from "react";
import IRouteModel from "src/models/IRouteModel";
import baseRouteConfig from "./configs/base.route.config";
import WithToastify from "src/hoc-helpers/WithToastify/WithToastify";

/**
 * Хук для получения всех маршрутов
 * @param isAuthenticated Флаг авторизации пользователя
 * @returns {JSX.Element} Функциональный компонент по URL
 */
const useRoutes = () => {
    const createRoutes = useCallback((routes: IRouteModel[]) => {
        return (
            routes && routes.map((value) => (<Route key={value.path} path={value.path} element={<value.element />}/>) )
        )
    }, []);

    return (
        <Routes>
            { createRoutes(baseRouteConfig) }

            <Route path='*' element={<Navigate to={"/"} />} />
        </Routes>
    );
};

export default WithToastify(useRoutes);