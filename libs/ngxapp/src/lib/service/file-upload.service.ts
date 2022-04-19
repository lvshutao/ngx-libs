import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

import {MyNgxUploadConfig, ServerEngine, UploadCallback} from "@fsl/ngxupload";
import {LibSnackService} from "@fsl/ngxmaz";

@Injectable()
/**
 *   providers: [
 *     {provide: UploadFileConfig, useValue: {allowTypes: AllowFileType}},
 *     {provide: UploadEngine, useClass: FileUploadService},
 *   ]
 */
export class FileUploadService {

  private engine: ServerEngine;

  constructor(private conf: MyNgxUploadConfig, private alter: LibSnackService,
              private http: HttpClient) {
    this.engine = new ServerEngine(conf, alter);
  }

  upload(file: File, action: UploadCallback, conf: any = {}) {
    return this.engine.uploadWith(file, action, conf, (url: string, data: FormData) => {
      return this.http.post(url, data);
    })
  }

  onInit() {
  }
}
