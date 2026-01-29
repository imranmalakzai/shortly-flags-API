class ApiError extends Error {
  statusCode!: number;
  success!: boolean;
  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    this.success = false;
  }
}
export default ApiError;
