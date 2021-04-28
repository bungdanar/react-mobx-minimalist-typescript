type ErrorPayload = {
  message: string
  statusCode: number
}

class ResponseError extends Error {
  private statusCode: number

  constructor(payload: ErrorPayload) {
    super(payload.message)
    this.statusCode = payload.statusCode

    Object.setPrototypeOf(this, ResponseError.prototype)
  }

  public serialize(): { message: string; statusCode: number } {
    return {
      message: this.message,
      statusCode: this.statusCode,
    }
  }
}

export const handleResponseErr = (err: any) => {
  if (err.response) {
    throw new ResponseError(err.response.data)
  } else {
    throw new ResponseError({
      statusCode: 408,
      message: 'Request Timeout',
    })
  }
}
