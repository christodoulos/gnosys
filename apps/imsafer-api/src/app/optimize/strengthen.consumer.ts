import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { nanoid } from 'nanoid';
import { spawn } from 'child_process';
import fs = require('fs');
import AdmZip = require('adm-zip');

const fsPromises = fs.promises;

async function mkDir(name: string) {
  try {
    return await fsPromises.mkdir(name, { recursive: true });
  } catch (err) {
    console.error('Error while making directory!', err);
  }
}

async function buffer2File(buffer: Buffer, fname: string) {
  try {
    fsPromises.writeFile(fname, buffer.toString());
    console.log('Successful buffer dump to file');
  } catch (err) {
    console.error('Error while writing buffer to file!', err);
  }
}

async function strengthenSpawn(folder: string, job: Job<unknown>) {
  const mcode =
    "addpath('/usr/local/lib/imsafer'); optimeccentricity('Data'); exit;";

  const strengthenSpawn = spawn(
    '/usr/local/bin/matlab',
    [
      '-nodesktop',
      '-nosplash',
      '-noFigureWindows',
      '-softwareopengl',
      '-batch',
      mcode,
    ],
    { cwd: folder }
  );
  for await (const data of strengthenSpawn.stdout) {
    const regex =
      /.*Current emin:\W([0-9]*[.][0-9]*).*Remaining decades:\W(.*)/gm;
    const match = regex.exec(data.toString());
    if (match) {
      const percomplete = 2.5 * (40 - parseInt(match[2]));
      job.progress(percomplete);
      console.log(`Completed: ${percomplete}%`);
    }
  }
  for await (const data of strengthenSpawn.stderr) {
    job.failedReason = data.toString();
    job.moveToFailed({ message: job.failedReason }, true);
    // console.error(`stderr: ${data.toString()}`);
  }
  strengthenSpawn.on('exit', (code) => {
    console.log(`Child process exited with code: ${code.toString()}`);
  });
}

@Processor('imsafer-strengthen')
export class StrengthenConsumer {
  @Process('imsafer-strengthen-job')
  async strengthenDo(job: Job<unknown>) {
    const randstr = nanoid();
    job.log(randstr);
    const folder = `/tmp/imsafer/${randstr}/`;
    const fname = `${folder}/Data.csv`;
    const buffer = Buffer.from(job.data['scase'][0]['buffer']['data']);
    await mkDir(folder);
    await buffer2File(buffer, fname);
    await strengthenSpawn(folder, job);
    const zip = new AdmZip();
    zip.addLocalFolder(folder);
    return zip.toBuffer();
  }
}
