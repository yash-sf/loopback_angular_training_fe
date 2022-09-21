import { CrudOperations } from './crud.interface';
import { environment } from "src/environments/environment";
import axios, { AxiosPromise } from "axios";

export abstract class CrudService<T, ID> implements CrudOperations<T, ID> {

  baseUrl: string = environment.apiUrl
  constructor(
    protected _slug: string
  ) {}

  save(t: T): AxiosPromise<T> {
    return axios.post<T>(this.baseUrl + this._slug, t);
  }

  update(id: ID, t: T): AxiosPromise<T> {
    return axios.put<T>(this.baseUrl + this._slug + "/" + id, t, {});
  }

  findOne(id: ID): AxiosPromise<T> {
    return axios.get<T>(this.baseUrl + this._slug + "/" + id);
  }

  findAll(): AxiosPromise<T[]> {
    return axios.get<T[]>(this.baseUrl + this._slug)
  }

  delete(id: ID): AxiosPromise<T> {
    return axios.delete<T>(this.baseUrl + this._slug + '/' + id);
  }

}