export class AppError {
  message: string;

  constructor (message: string) { 
    this.message = message;
  }

  static isAppError(error: unknown) {
    const isAppError = error instanceof AppError
    const title = isAppError ? error.message : "Erro no servidor, tente novamente mais tarde."
  
    return title;
  }
}