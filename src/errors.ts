export class AppError extends Error {
  constructor(message: string, readonly status: number, readonly details?: unknown) {
    super(message);
  }
}
export class NotFoundError extends AppError { constructor(msg: string) { super(msg, 404); } }
export class ValidationError extends AppError { constructor(msg: string, details?: unknown) { super(msg, 400, details); } }
export class UnauthorizedError extends AppError { constructor(msg = "Non authentifié") { super(msg, 401); } }
export class ForbiddenError extends AppError { constructor(msg = "Accès refusé") { super(msg, 403); } }
