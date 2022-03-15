/* eslint-disable @typescript-eslint/no-explicit-any */
export const makeDataObject = (message: string, data?: any) => {
  return { status: true, message, data };
};

export const makeErrorObject = (message: string) => {
  return { status: false, message };
};
