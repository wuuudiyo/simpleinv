export type IpcErrorCode =
  | 'VALIDATION_ERROR'
  | 'NOT_FOUND'
  | 'DATABASE_ERROR'
  | 'UNKNOWN';

export interface IpcErrorResponse {
  code: IpcErrorCode;
  message: string;
}

export class IpcError extends Error {
  constructor(
    public readonly code: IpcErrorCode,
    message: string
  ) {
    super(message);
    this.name = 'IpcError';
  }

  toResponse(): IpcErrorResponse {
    return { code: this.code, message: this.message };
  }
}
