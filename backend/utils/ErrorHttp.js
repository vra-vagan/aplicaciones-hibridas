export class ErrorHttp extends Error {
    constructor(status, message) {
        super(message);
        this.name = 'ErrorHttp';
        this.status = status;
    }
}
