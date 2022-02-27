import {
  Component,
  ChangeDetectionStrategy,
  Pipe,
  PipeTransform,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}
  transform(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}

@Component({
  selector: 'gnosys-iframe',
  templateUrl: './iframe.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IframeComponent implements AfterViewInit, OnChanges {
  @ViewChild('iframe') iframeElmRef: ElementRef | undefined;
  iframe: HTMLIFrameElement | undefined;
  @Input() srcdoc: string | undefined;

  ngOnChanges(changes: SimpleChanges) {
    if (this.iframe && changes['srcdoc']) {
      this.iframe.srcdoc = changes['srcdoc'].currentValue;
    }
  }

  ngAfterViewInit(): void {
    if (this.iframeElmRef) {
      this.iframe = this.iframeElmRef.nativeElement;
    }
  }
}
