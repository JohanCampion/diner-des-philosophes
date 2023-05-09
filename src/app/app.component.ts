import {Component, OnInit} from '@angular/core';
import {Semaphore} from "../utils/Semaphore";
import {PhilosopheObject} from "../utils/PhilosopheObject";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'programmation-parallele';

  Nombre_philosophe = 6;

  philosophes: PhilosopheObject[] = [];

  numPhilosophers: number = 12;
  elements = Array(this.numPhilosophers).fill(0).map((x, i) => i + 1);

  constructor() {
  }

  async ngOnInit(): Promise<void> {
    const forks: Semaphore[] = [];
    for (let i = 0; i < this.numPhilosophers; i++) {
      forks.push(new Semaphore(1));
    }

    for (let i = 0; i < this.numPhilosophers; i++) {
      const leftFork = forks[i];
      const rightFork = forks[(i + 1) % this.numPhilosophers];
      this.philosophes.push(new PhilosopheObject(`Philosopher ${i}`, leftFork, rightFork));
    }

// start dining
    for (let i = 0; i < this.numPhilosophers; i++) {
      const philosopher = this.philosophes[i];
      philosopher.dine();
    }
  }




}
