import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { nanoid } from 'nanoid';
import { exec as stdExec, spawn } from 'child_process';
import fs = require('fs');
import util = require('util');

const fsPromises = fs.promises;
const exec = util.promisify(stdExec);
// const spawn = util.promisify(stdSpawn);

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

async function strengthenExec(folder: string) {
  const mcode =
    "addpath('/usr/local/lib/imsafer'); optimeccentricity('Data'); exit;";
  try {
    const { stdout, stderr } = await exec(
      `/usr/local/bin/matlab -nodesktop -nosplash -noFigureWindows -softwareopengl -batch "${mcode}"`,
      { cwd: folder }
    );
    console.log('stdout:', stdout);
    console.log('stderr:', stderr);
  } catch (err) {
    console.error('Error while running strengthen matlab code!', err);
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
  strengthenSpawn.stdout.on('data', (data) => {
    // console.log(`stdout: ${data.toString()}`);
    const regex =
      /.*Current emin:\W([0-9]*[.][0-9]*).*Remaining decades:\W(.*)/gm;
    const match = regex.exec(data.toString());
    if (match) {
      const percomplete = 2.5 * (40 - parseInt(match[2]));
      job.progress(percomplete);
      console.log(`Completed: ${percomplete}%`);
    }
  });
  strengthenSpawn.stderr.on('data', (data) => {
    console.error(`stderr: ${data.toString()}`);
    job.failedReason = data.toString();
  });
  strengthenSpawn.on('exit', (code) => {
    if (code !== 0) job.moveToFailed({ message: job.failedReason });
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
  }
}
