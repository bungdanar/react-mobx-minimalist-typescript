type ErrorPayload = {
  message: string
  statusCode: number
}

export class ResponseError extends Error {
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

// This function must be called inside the catch block
export const generateErrMessage = (error: Error): string => {
  let errMessage

  if (error instanceof ResponseError) {
    errMessage = error.serialize().message
  } else {
    if (process.env.NODE_ENV !== 'production') {
      console.error(error)
    }

    errMessage = error.message
  }

  return errMessage
}
