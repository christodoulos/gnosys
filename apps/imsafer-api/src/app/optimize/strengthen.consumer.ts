import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { nanoid } from 'nanoid';
import { exec as stdExec } from 'child_process';
import fs = require('fs');
import util = require('util');

const fsPromises = fs.promises;
// const exec = util.promisify(require('child_process').exec);
const exec = util.promisify(stdExec);

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

async function strengthen(folder: string) {
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
    await strengthen(folder);
  }
}
