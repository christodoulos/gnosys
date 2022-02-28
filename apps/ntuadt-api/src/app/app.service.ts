import { Injectable } from '@nestjs/common';
import { BusPosition } from '@gnosys/interfaces';
import { FirebaseAdmin, InjectFirebaseAdmin } from 'nestjs-firebase';

@Injectable()
export class AppService {
  db = this.firebase.db;
  constructor(
    @InjectFirebaseAdmin() private readonly firebase: FirebaseAdmin
  ) {}

  getData(): { message: string } {
    return { message: 'Welcome to ntuadt-api!' };
  }

  async busPosition(): Promise<Array<BusPosition>> {
    const busRef = this.db.collection('bus242').doc('position');
    const doc = await busRef.get();
    const response = [];
    for (const [, v] of Object.entries(doc.data())) {
      response.push(v);
    }
    console.log(response);
    return response;
  }
}
