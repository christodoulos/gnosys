import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

import { exec } from 'child_process';
import fs = require('fs');

@Processor('imsafer-strengthen')
export class StrengthenConsumer {
  @Process('imsafer-strengthen-job')
  strengthenDo(job: Job<unknown>) {
    console.log(1);
    const randstr = (Math.random() + 1).toString(36).substring(7);
    const folder = `/tmp/imsafer-${randstr}`;
    const fname = `${folder}/Data.csv`;
    const buffer = Buffer.from(job.data['scase'][0]['buffer']['data']);
    console.log(buffer);
    fs.mkdirSync(folder);
    fs.open(fname, 'w', function (err, fd) {
      if (err) {
        throw 'could not open file: ' + err;
      }

      // write the contents of the buffer, from position 0 to the end, to the file descriptor returned in opening our file
      fs.write(fd, buffer, 0, buffer.length, null, function (err) {
        if (err) throw 'error writing file: ' + err;
        fs.close(fd, function () {
          console.log('wrote the file successfully');
        });
      });
    });
    console.log(1);
    const mcode =
      "addpath('/usr/local/lib/imsafer'); optimeccentricity('Data'); exit;";
    exec(
      `/usr/local/bin/matlab -nodesktop -nosplash -noFigureWindows -softwareopengl -r "${mcode}"`,
      { cwd: folder },
      (error, stdout, stderr) => {
        if (error) {
          console.log(error.stack);
          console.log('Error code: ' + error.code);
          console.log('Signal received: ' + error.signal);
        }
        console.log('Child Process STDOUT: ' + stdout);
        console.log('Child Process STDERR: ' + stderr);
      }
    );

    console.log('imsafer strengthen job', job.data);
    return 99999;
  }
}
