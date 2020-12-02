import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TreeNode } from 'primeng/api';


@Injectable()
export class NodesService {

    constructor(private http: HttpClient) { }

    getFiles() {
    return this.http.get<any>('assets/files.json')
      .toPromise()
      .then(res => <TreeNode[]>res.data);
    }

    getLazyFiles() {
    return this.http.get<any>('assets/files-lazy.json')
      .toPromise()
      .then(res => <TreeNode[]>res.data);
    }
}