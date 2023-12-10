const Api = {
    MAIN_SERVER: "http://localhost:5000/api", //"https://discount.skladgranit.ru/api", //"http://localhost:5000/api",
    SIGN_IN: "/auth/sign-in",
    SIGN_UP: "/auth/sign-up",
    REFRESH_TOKEN: "/auth/refresh/token",
    DOOR_GET_ALL: "/user/door/get/all",
    MAILER_COMMON_SEND: "/user/mailer/common/send",
    MAILER_ORDER_SEND: "/user/mailer/order/send",
    FILTER_INFO: "/user/filter/info"
};

export default Api;