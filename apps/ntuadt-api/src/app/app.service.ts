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
    // console.log(response);
    return response;
  }

  async itia() {
    const itiaRef564 = this.db.collection('itia').doc('564');
    const itiaRef669 = this.db.collection('itia').doc('669');
    const doc564 = (await itiaRef564.get()).data();
    const doc669 = (await itiaRef669.get()).data();
    const data = { s564: doc564, s669: doc669 };
    return data;
  }
}
