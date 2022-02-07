import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImsaferService } from '../app.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FormControl, FormGroup } from '@ngneat/reactive-forms';
import { Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@UntilDestroy()
@Component({
  templateUrl: './strengthen.component.html',
  styleUrls: ['./strengthen.component.css'],
})
export class StrengthenComponent implements OnInit {
  jobID: string | undefined;
  completed: boolean | undefined;
  progress = '0';
  thumbnail: ArrayBuffer | string | null | undefined;
  jobFailed = false;
  failedReason = '';
  caseName = '';
  pillars = 8;

  numberRegEx = /^-?\d*\.?\d*$/;

  form0 = new FormGroup({
    x: new FormControl('4.14', [
      Validators.required,
      Validators.pattern(this.numberRegEx),
    ]),
    y: new FormControl('4.86', [
      Validators.required,
      Validators.pattern(this.numberRegEx),
    ]),
  });

  form1 = new FormGroup({
    pmin: new FormControl('0.01', [
      Validators.required,
      Validators.pattern(this.numberRegEx),
    ]),
    pmax: new FormControl('0.04', [
      Validators.required,
      Validators.pattern(this.numberRegEx),
    ]),
  });

  form2 = new FormGroup({
    pillars: new FormControl('8', [
      Validators.required,
      Validators.pattern(this.numberRegEx),
    ]),
  });

  formpillar: Array<any> = [];

  tooltips = [
    'Διάσταση υποστυλώματος // στον x, b (m)',
    'Διάσταση υποστυλώματος // στον y, h (m)',
    'Αρχικό μηχανικό ποσοστό οπλισμού, ρ',
    'Τετμημένη κέντρου μάζας υποστυλώματος, x (m)',
    'Τεταγμένη κέντρου μάζας υποστυλώματος, y (m)',
    'Συντελεστής απομείωσης δυσκαμψίας λόγω ρηγμάτωσης',
    'Πάχος αρχικής ενίσχυσης (απαιτήσεις αντοχής στοιχείου), to (m)',
    'Μηχανικό ποσοστό οπλισμού αρχικής ενίσχυσης',
    'Πάχος επιπρόσθετης ενίσχυσης που θα προκύψει από την ελαχιστοποίηση της εκκεντρότητας',
    'Μηχανικό ποσοστό επιπρόσθετου οπλισμού ενίσχυσης, ρnew',
    'Μέτρο ελαστικότητας αρχικού υλικού, Ε (kPa)',
    'Μέτρο ελαστικότητας υλικού ενισχύσεων, Ε’ (kPa)',
    'Ύψος υποστυλώματος, l (m)',
    'Αξονική θλιπτική δύναμη σκυροδέματος για το συνδυασμό G+0.3Q (με θετικό πρόσημο), Ν (kN)',
    'Μέγιστο πάχος επιπρόσθετης ενίσχυσης t new,max (m)',
  ];

  constructor(private service: ImsaferService, private router: Router) {}

  ngOnInit(): void {
    this.genPillarData();
    this.form2.controls.pillars.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((value) => {
        if (this.form2.valid) {
          this.pillars = parseInt(value);
          this.genPillarData();
        }
      });
  }

  submitCase(data: FormData) {
    this.service
      .uploadStrengthen(data)
      .pipe(untilDestroyed(this))
      .subscribe((data) => {
        this.jobID = data['jobID'];
        this.caseName = data['name'];
        this.router.navigate(['Results']);
        if (this.jobID) {
          this.service
            .getStrengthenJob(this.jobID)
            .pipe(untilDestroyed(this))
            .subscribe((job) => {
              this.completed = job.completed;
            });
        }
      });
  }

  refresh() {
    if (this.jobID)
      this.service
        .getStrengthenJob(this.jobID)
        .pipe(untilDestroyed(this))
        .subscribe((job) => {
          console.log(job);
          this.progress = job.progress || '';
          if (job.completed && !job.failed && this.jobID) {
            this.completed = true;
            this.service
              .getStrengthenJobImage(this.jobID)
              .pipe(untilDestroyed(this))
              .subscribe((img) => {
                this.createImageFromBlob(img);
                // this.thumbnail = this.service.createImageFromBlob(img);
              });
          }
          if (job.failed) {
            this.failedReason = job.failedReason || '';
            this.jobFailed = true;
            this.completed = true;
          }
        });
  }

  reload() {
    this.service.reloadComponent('/Strengthen');
  }

  downloadResults() {
    this.service.downloadResults(
      '/api/optimize/strengthen',
      this.jobID || '',
      this.caseName
    );
  }

  createImageFromBlob(image: Blob) {
    const reader = new FileReader();
    reader.addEventListener(
      'load',
      () => {
        this.thumbnail = reader.result;
      },
      false
    );

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  genPillarData() {
    this.formpillar = [];
    for (let i = 0; i < this.pillars; i++) {
      this.formpillar.push(
        new FormGroup({
          1: new FormControl('0.4', [
            Validators.required,
            Validators.pattern(this.numberRegEx),
          ]),
          2: new FormControl('0.4', [
            Validators.required,
            Validators.pattern(this.numberRegEx),
          ]),
          3: new FormControl('0.02', [
            Validators.required,
            Validators.pattern(this.numberRegEx),
          ]),
          4: new FormControl('0.2', [
            Validators.required,
            Validators.pattern(this.numberRegEx),
          ]),
          5: new FormControl('7.8', [
            Validators.required,
            Validators.pattern(this.numberRegEx),
          ]),
          6: new FormControl('0.6', [
            Validators.required,
            Validators.pattern(this.numberRegEx),
          ]),
          7: new FormControl('0.08', [
            Validators.required,
            Validators.pattern(this.numberRegEx),
          ]),
          8: new FormControl('0.03', [
            Validators.required,
            Validators.pattern(this.numberRegEx),
          ]),
          9: new FormControl('0.1', [
            Validators.required,
            Validators.pattern(this.numberRegEx),
          ]),
          10: new FormControl('0.025', [
            Validators.required,
            Validators.pattern(this.numberRegEx),
          ]),
          11: new FormControl('30000000', [
            Validators.required,
            Validators.pattern(this.numberRegEx),
          ]),
          12: new FormControl('32000000', [
            Validators.required,
            Validators.pattern(this.numberRegEx),
          ]),
          13: new FormControl('3', [
            Validators.required,
            Validators.pattern(this.numberRegEx),
          ]),
          14: new FormControl('1000', [
            Validators.required,
            Validators.pattern(this.numberRegEx),
          ]),
          15: new FormControl('0.1', [
            Validators.required,
            Validators.pattern(this.numberRegEx),
          ]),
        })
      );
    }
  }
}
