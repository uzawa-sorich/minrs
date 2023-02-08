interface MinrsErrorConstructor<TError extends Error> {
  new (message?: string): TError;
  (message?: string): TError;
}

const createMinrsErrorConstructor = <TError extends Error>(
  name: string,
  base: { new (message?: string): Error }
): MinrsErrorConstructor<TError> => {
  function MinrsError(message?: string): TError {
    const error = new base(message);
    error.name = name;
    Object.setPrototypeOf(error, MinrsError.prototype);
    return error as TError;
  }
  MinrsError.prototype = Object.create(base.prototype);
  return MinrsError as MinrsErrorConstructor<TError>;
};

type MinrsErrorThrower = (message?: string) => never;

const createMinrsErrorThrower =
  <TError extends Error>(
    constructor: MinrsErrorConstructor<TError>
  ): MinrsErrorThrower =>
  (message?: string): never => {
    throw new constructor(message);
  };

export type PanicError = Error;
export const PanicError = createMinrsErrorConstructor<PanicError>(
  "PanicError",
  Error
);
export const panic: MinrsErrorThrower = createMinrsErrorThrower(PanicError);

export type TodoError = Error;
export const TodoError = createMinrsErrorConstructor<TodoError>(
  "TodoError",
  PanicError
);
export const todo: MinrsErrorThrower = createMinrsErrorThrower(TodoError);

export type UnimplementedError = Error;
export const UnimplementedError = createMinrsErrorConstructor<TodoError>(
  "UnimplementedError",
  PanicError
);
export const unimplemented: MinrsErrorThrower =
  createMinrsErrorThrower(UnimplementedError);

export type UnreachableError = Error;
export const UnreachableError = createMinrsErrorConstructor<TodoError>(
  "UnreachableError",
  PanicError
);
export const unreachable: MinrsErrorThrower =
  createMinrsErrorThrower(UnreachableError);
