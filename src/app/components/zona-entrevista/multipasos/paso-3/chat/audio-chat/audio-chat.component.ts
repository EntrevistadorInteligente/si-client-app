import { Component, OnDestroy, OnInit } from '@angular/core';
import { BaseEntrevistaComponent } from '../../base-entrevista/base-entrevista.component';
import { EntrevistaService } from 'src/app/shared/services/domain/entrevista.service';

@Component({
  selector: 'app-audio-chat',
  templateUrl: './audio-chat.component.html',
  styleUrl: './audio-chat.component.scss',
})
export class AudioChatComponent
  extends BaseEntrevistaComponent
  implements OnInit, OnDestroy
{
  isFullscreen: boolean = true;
  pause: boolean = false;
  private audioContext: AudioContext;
  private analyser: AnalyserNode;
  private microphone: MediaStreamAudioSourceNode;
  private javascriptNode: ScriptProcessorNode;
  private canvas: HTMLCanvasElement;

  closeFullscreen() {
    this.isFullscreen = false;
    // Aquí puedes emitir un evento para cerrar el componente si es necesario
  }

  constructor(entrevistaService: EntrevistaService) {
    super(entrevistaService);
  }

  ngAfterViewInit(): void {}

  override ngOnInit(): void {
    this.audioContext = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
  }

  override showNextQuestion(): void {
    throw new Error('Method not implemented.');
  }
  override processAssistantResponse(response: string): void {
    throw new Error('Method not implemented.');
  }
  override handleUserResponse(response: string): void {
    throw new Error('Method not implemented.');
  }
  override handleHistoryLoaded(): void {
    throw new Error('Method not implemented.');
  }
  override sendMessage(): void {
    throw new Error('Method not implemented.');
  }

  ngOnDestroy(): void {
    this.stopVisualization();
  }

  toggleVisualization(): void {
    this.canvas = document.getElementById('visualizer') as HTMLCanvasElement;
    if (this.pause) {
      this.stopVisualization();
    } else {
      this.startVisualization();
    }
  }

  startVisualization(): void {
    if (!this.canvas) {
      console.error('Canvas element not found');
      return;
    }
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(stream => {
        this.microphone = this.audioContext.createMediaStreamSource(stream);
        this.analyser = this.audioContext.createAnalyser();
        this.javascriptNode = this.audioContext.createScriptProcessor(
          2048,
          1,
          1
        );

        this.analyser.smoothingTimeConstant = 0.8;
        this.analyser.fftSize = 1024;

        this.microphone.connect(this.analyser);
        this.analyser.connect(this.javascriptNode);
        this.javascriptNode.connect(this.audioContext.destination);

        this.javascriptNode.onaudioprocess = () => {
          const array = new Uint8Array(this.analyser.frequencyBinCount);
          this.analyser.getByteFrequencyData(array);
          const average = array.reduce((a, b) => a + b) / array.length;
          this.resizeCircle(average);
        };
        this.pause = true;
      })
      .catch(error => {
        console.error('Error accessing microphone:', error);
      });
  }

  stopVisualization(): void {
    if (!this.pause) return; // No está visualizando

    if (this.javascriptNode) {
      this.javascriptNode.disconnect();
    }
    if (this.analyser) {
      this.analyser.disconnect();
    }
    if (this.microphone) {
      this.microphone.disconnect();
    }
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
    }

    if (this.canvas) {
      setTimeout(() => {
        this.canvas.removeAttribute('style');
      }, 0);
    }
    this.pause = false;
  }

  resizeCircle(average: number): void {
    if (!this.canvas) return;

    const screenWidth = window.innerWidth;

    // Definir el tamaño base en función del ancho de la pantalla
    let baseSize: number;

    if (screenWidth > 1200) {
      baseSize = 30; // 40vw
    } else if (screenWidth > 950) {
      baseSize = 40; // 50vw
    } else if (screenWidth > 700) {
      baseSize = 50; // 60vw
    } else if (screenWidth > 500) {
      baseSize = 60; // 70vw
    } else if (screenWidth > 350) {
      baseSize = 70; // 80vw
    } else {
      baseSize = 80;
    }

    // Convertir baseSize de vw a px
    const baseSizePx = (baseSize / 100) * screenWidth;

    const maxChange = 500; // Cambio máximo en px
    const minChange = 0; // Cambio mínimo en px

    // Calcular el cambio basado en la frecuencia promedio
    const change = Math.min(
      Math.max((average / 255) * maxChange, minChange),
      maxChange
    );

    // Calcular el nuevo tamaño del canvas
    const newSize = baseSizePx + change;

    // Aplicar nuevo tamaño al canvas
    this.canvas.style.width = `${newSize}px`;
    this.canvas.style.height = `${newSize}px`;
  }
}
