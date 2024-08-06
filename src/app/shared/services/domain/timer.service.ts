import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimerService {
  private timerInterval: any;
  private duration: number;
  private remainingTime: number = 0;
  private isRunning: boolean = false;

  public time$ = new BehaviorSubject<string>('00:00');
  public dashOffset$ = new BehaviorSubject<number>(0);

  startTimer(duration: number): void {
    if (this.isRunning) {
      return;
    }

    this.isRunning = true;
    this.duration = duration;
    this.remainingTime = duration;

    this.timerInterval = setInterval(() => {
      this.remainingTime--;
      this.updateTime();

      if (this.remainingTime < 0) {
        this.stopTimer();
        this.time$.next('00:00');
        this.dashOffset$.next(0);
      }
    }, 1000);
  }

  stopTimer(): void {
    if (!this.isRunning) {
      return;
    }

    this.isRunning = false;
    clearInterval(this.timerInterval);
  }

  private updateTime(): void {
    const minutes = Math.floor(this.remainingTime / 60);
    const seconds = this.remainingTime % 60;
    this.time$.next(`${this.pad(minutes)}:${this.pad(seconds)}`);
    this.dashOffset$.next(this.calculateDashOffset());
  }

  private calculateDashOffset(): number {
    const circumference = 282.7433388230814;
    return circumference * (1 - this.remainingTime / this.duration);
  }

  private pad(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }
}