import Drive from "@ioc:Adonis/Core/Drive";
import Env from "@ioc:Adonis/Core/Env";
import { DateTime } from "luxon";
import fs from "fs";

const rootPath = Env.get("S3_ROOT");

export default class StorageHelper {
  public getUrl(file: any, additionalPath: any = null) {
    const result = Env.get("S3_ENDPOINT") + "/" + Env.get("S3_BUCKET") + "/" + Env.get("S3_ROOT") + "/" + additionalPath + "/" + file;

    return result;
  }

  public async upload(file: any, additionalPath: any = null) {
    let fileName: any = null;

    if (file) {
      const now = DateTime.now().toFormat("yyyyLLddHHmmss");
      const uniqueId = Math.random().toString(26).slice(2);

      fileName = now + uniqueId + "." + file.extname;
      let filePath = rootPath + "/" + fileName;

      if (additionalPath) {
        filePath = rootPath + "/" + additionalPath + "/" + fileName;
      }

      const fileStream = fs.createReadStream(file.tmpPath!);

      await Drive.use("s3").putStream(filePath, fileStream, {
        contentType: file.headers["content-type"],
      });
    }

    return fileName;
  }

  public async delete(file: any, additionalPath: any = null) {
    let filePath = rootPath + "/" + file;

    if (additionalPath) {
      filePath = rootPath + "/" + additionalPath + "/" + file;
    }

    if (await Drive.use("s3").exists(filePath)) {
      await Drive.use("s3").delete(filePath);
    }
  }
}
