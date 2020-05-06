import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { plainToClass, classToPlain } from 'class-transformer';
import { GetManyEntityInterface } from '../lib/interfaces/get-many.interface';
import { GetOneEntityInterface } from '../lib/interfaces/get-one.interface';
import { CreateEntityInterface } from '../lib/interfaces/create.interface';
import { UpdateEntityInterface } from '../lib/interfaces/update.interface';
import { DeleteEntityInterface } from '../lib/interfaces/delete.interface';
import { Paginable } from '../lib/interfaces/paginable.interface';
import * as Fingerprint from 'fingerprintjs2';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiRequestService {
  public static readonly MEDIA_JSON: HttpHeaders = new HttpHeaders({
    'Content-Type': 'app./HttpRequest',
  });
  public static readonly MEDIA_FORM_URLENCODED: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
  });
  public fingerprint: string;

  constructor(private readonly http: HttpClient) {}

  /**
   * Get many entity
   * @param data data for get request
   */
  public async getMany<T>(data: GetManyEntityInterface<T>): Promise<T[]> {
    let query = `${this.getServiceUrl(data.apiVersion)}/${data.entityName}`;

    if (data.query) query = query.concat(`?${data.query}`);

    const response = await this.http
      .get<any>(query, {
        withCredentials: true,
      })
      .toPromise();

    let responseData: T[] = response;
    if (response.data) {
      responseData = response.data;
    }

    if (data.transform && data.transform.type)
      return plainToClass(data.transform.type, responseData);
    return responseData;
  }

  /**
   * Get many entity in pages
   * @param data data for get request
   */
  public async getManyInPages<T>(
    data: GetManyEntityInterface<T>,
  ): Promise<Paginable<T>> {
    let query = `${this.getServiceUrl(data.apiVersion)}/${data.entityName}`;

    if (!data.query.includes('page'))
      throw new Error('Page has not been set in query');
    if (data.query) query = query.concat(`?${data.query}`);

    const response = await this.http
      .get<Paginable<T>>(query, {
        withCredentials: true,
      })
      .toPromise();

    if (data.transform && data.transform.type)
      response.data = plainToClass(data.transform.type, response.data);
    return response;
  }

  /**
   * Get one entity by id
   * @param data data for get request
   */
  public async getOne<T>(data: GetOneEntityInterface<T>): Promise<T> {
    let query = `${this.getServiceUrl(data.apiVersion)}/${data.entityName}/${
      data.entityId
    }`;

    if (data.query) query = query.concat(`?${data.query}`);

    const response = await this.http
      .get<any>(query, {
        withCredentials: true,
      })
      .toPromise();

    if (data.transform && data.transform.type)
      return plainToClass(data.transform.type, response);
    return response;
  }

  /**
   * Create new entity
   * @param data data for create
   */
  public async createOne<T>(data: CreateEntityInterface<T>): Promise<T> {
    const query = `${this.getServiceUrl(data.apiVersion)}/${data.entityName}`;

    if (data.transform && data.transform.type) {
      data.body = classToPlain(data.body) as any;
    }

    const response = await this.http
      .post<any>(query, data.body, {
        withCredentials: true,
      })
      .toPromise();

    if (data.transform && data.transform.type)
      return plainToClass(data.transform.type, response);
    return response;
  }

  /**
   * Update one entity
   * @param data data for updating
   */
  public async updateOne<T>(data: UpdateEntityInterface<T>): Promise<T> {
    const query = `${this.getServiceUrl(data.apiVersion)}/${data.entityName}/${
      data.entityId
    }`;

    const response = await this.http
      .patch<any>(query, data.body, {
        withCredentials: true,
      })
      .toPromise();

    if (data.transform && data.transform.type)
      return plainToClass(data.transform.type, response);
    return response;
  }

  public async delete<T>(data: DeleteEntityInterface<T>): Promise<T> {
    const query = `${this.getServiceUrl(data.apiVersion)}/${data.entityName}/${
      data.entityId
    }`;

    const response = await this.http
      .delete<any>(query, {
        withCredentials: true,
      })
      .toPromise();

    return response;
  }

  public async getFingerprint(): Promise<string> {
    if (this.fingerprint) return this.fingerprint;
    const components = await Fingerprint.getPromise({
      excludes: {
        plugins: true,
        localStorage: true,
        adBlock: true,
        screenResolution: true,
        availableScreenResolution: true,
        enumerateDevices: true,
        pixelRatio: true,
        doNotTrack: true,
      },
    });

    const values = components.map((component) => component.value);
    console.log('fingerprint hash components', components);

    return (this.fingerprint = String(
      Fingerprint.x64hash128(values.join(''), 31),
    ));
  }

  public createRequest<T>(data: {
    method: 'get' | 'post' | 'patch' | 'delete';
    url: string;
    body?: unknown;
    params?: any;
  }): Observable<T> {
    // const headers = new HttpHeaders();\
    return this.http.request<T>(data.method, data.url, {
      withCredentials: true,
      params: data.params,
      body: data.body,
    });
  }

  private getServiceUrl(apiVersion: number): string {
    return `${environment.API}/v${apiVersion}`;
  }
}
