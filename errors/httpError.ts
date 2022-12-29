export class HttpError extends Error {
  code: number;
  constructor(code: number) {
    const msg = errorCodes[code] || "Something went wrong";
    super(msg);
    this.code = code;
  }
}

const errorCodes: IErrorCodes = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  500: "Internal Server Error",
  502: "Bad Gateway",
  503: "Service Unavailable",
  504: "Gateway Timeout",
};

interface IErrorCodes {
  [key: number]: string;
}
