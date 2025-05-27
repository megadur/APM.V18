export interface Mapper<T, U> {
  toDto(input: T): U;
  toDtoArray(input: T[]): U[];
  toModel(input: U): T;
  toModelArray(input: U[]): T[];
}
