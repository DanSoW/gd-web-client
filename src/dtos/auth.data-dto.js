export default class AuthDataDto {
    access_token;
    refresh_token;

    constructor(model) {
        this.access_token = model.access_token;
        this.refresh_token = model.refresh_token;
    }
}