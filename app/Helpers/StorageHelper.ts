import Env from "@ioc:Adonis/Core/Env";

import axios from "axios";
import FormData from "form-data";
import fs from "fs";

const apiUrl = Env.get("FILE_SERVICE_URL");

export default class StorageHelper {
  public async create(name: any, file: any) {
    let response: any;

    var payload = new FormData();

    payload.append("name", name);
    payload.append("file", fs.createReadStream(file.tmpPath));

    await axios
      .post(apiUrl + "/api/file-service", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        response = res.data.data;
      })
      .catch((e) => {});

    return response;
  }

  public async delete(fileId: any) {
    await axios
      .delete(apiUrl + "/api/file-service/" + fileId)
      .then((res) => {})
      .catch((e) => {});
  }
}
