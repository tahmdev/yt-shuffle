export class HttpError extends Error {
  code: number;
  constructor(code: number, msg?: string) {
    if (!msg) msg = defaultMessages[code] || "Something went wrong";
    super(msg);
    this.code = code;
  }
}

const defaultMessages: IDefaultMessages = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  500: "Internal Server Error",
  502: "Bad Gateway",
  503: "Service Unavailable",
  504: "Gateway Timeout",
};

interface IDefaultMessages {
  [key: number]: string;
}
