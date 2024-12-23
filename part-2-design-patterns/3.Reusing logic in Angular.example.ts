// timer.mixin.ts
class TimerMixin {
    startTime = 0;
    intervalId: any;
  
    startTimer() {
      this.startTime = Date.now();
      this.intervalId = setInterval(() => {
        console.log('Timer running');
      }, 1000);
    }
  
    stopTimer() {
      clearInterval(this.intervalId);
    }
  }
  
  // Componente que usa el mixin
  //import { TimerMixin } from './timer.mixin';
  
  //@Component
  //(
  const component =  {
    selector: 'app-timer',
    template: `<button (click)="startTimer()">Start</button><button (click)="stopTimer()">Stop</button>`,
  }
  //)
  export class TimerComponent extends TimerMixin {}
  