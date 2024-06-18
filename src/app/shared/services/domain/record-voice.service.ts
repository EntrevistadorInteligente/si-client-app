import { Injectable, NgZone } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecordVoiceService {

  private recognition: any;
  private speechRecognition: any;
  private speechResult = new Subject<string>();
  private recordingStatus = new Subject<boolean>();
  private recognitionError = new Subject<string>();
  private isManualStop: boolean = false;
  private interimTranscript = '';
  private finalTranscript = '';

  constructor(private ngZone: NgZone) { 
    this.record();
  }

  record() {
    const { webkitSpeechRecognition, SpeechRecognition }: any = window as any;
    this.speechRecognition = webkitSpeechRecognition || SpeechRecognition;
    if (this.speechRecognition) {
      this.recognition = new this.speechRecognition();
      this.recognition.lang = 'es-ES';
      this.recognition.interimResults = true;
      this.recognition.maxAlternatives = 1;
      this.recognition.continuous = true;

      this.recognition.onstart = () => {
        this.ngZone.run(() => {
          this.recordingStatus.next(true);
        });
      };

      this.recognition.onend = () => {
        if (!this.isManualStop) {
          this.startRecognition();
        } else {
          this.ngZone.run(() => {
            this.recordingStatus.next(false);
          });
        }
      };

      this.recognition.onresult = (event: any) => {
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            this.finalTranscript += event.results[i][0].transcript;
            this.ngZone.run(() => {
              this.speechResult.next(this.finalTranscript);
            });
            this.interimTranscript = '';
          } else {
            interimTranscript += event.results[i][0].transcript;
            this.ngZone.run(() => {
              this.speechResult.next(this.finalTranscript + interimTranscript);
            });
          }
        }
      };

      this.recognition.onerror = (event: any) => {
        this.ngZone.run(() => {
          this.recognitionError.next(event.error);
        });
      };
    } else {
      console.warn('Speech Recognition API no es soportada en este navegador.');
    }
  }

  startRecognition() {
    if (this.recognition) {
      this.isManualStop = false;
      this.recognition.start();
    }
  }

  stopRecognition() {
    if (this.recognition) {
      this.isManualStop = true;
      this.recognition.stop();
    }
  }

  resetRecognitionBuffer() {
    this.finalTranscript = '';
    this.interimTranscript = '';
  }

  getSpeechResult(): Observable<string> {
    return this.speechResult.asObservable();
  }

  getRecordingStatus(): Observable<boolean> {
    return this.recordingStatus.asObservable();
  }

  getRecognitionError(): Observable<string> {
    return this.recognitionError.asObservable();
  }
}
