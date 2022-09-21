import { AxiosPromise } from 'axios';
import { Observable } from 'rxjs';

export interface CrudOperations<T, ID> {
  save(t: T): AxiosPromise<T>;
  update(id: ID, t: T): AxiosPromise<T>;
  findOne(id: ID): AxiosPromise<T>;
  findAll(): AxiosPromise<T[]>;
  delete(id: ID): AxiosPromise<any>;
}