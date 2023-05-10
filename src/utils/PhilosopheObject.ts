import {Semaphore} from "./Semaphore";
import {interval, timer} from "rxjs";

export class PhilosopheObject {

  state: 'pense' | 'mange' | 'affame' | 'mort' = 'pense' ;


  fourchetteGauche: Semaphore;
  fourchetteDroite: Semaphore;
  nom: String;

  min = 3000;
  max = 6000;
  tempsBeforeDie = 60;
  _tempsBeforeDie: number = this.tempsBeforeDie;
  interval: any;

  startTimer() {
    this.interval = setInterval(() => {
      if(this._tempsBeforeDie > 0) {
        this._tempsBeforeDie--;
        if (this._tempsBeforeDie == 0) {
          this.state = 'mort';
        }
      } else {
        this._tempsBeforeDie = this.tempsBeforeDie;
      }
    },1000)
  }

  pauseTimer() {
    clearInterval(this.interval);
    this._tempsBeforeDie = this.tempsBeforeDie;
  }




  constructor(nom: String, fourchetteGauche: Semaphore, fourchetteDroite: Semaphore) {
    this.fourchetteDroite = fourchetteDroite;
    this.fourchetteGauche = fourchetteGauche;
    this.nom = nom;
  }

  async penser() {
    if (this.state !== 'mort') {
      this.state = "pense";
      console.log(`${this.nom} est entrain de penser`);
      await new Promise(resolve => setTimeout(resolve, Math.floor(Math.random() * (this.max - this.min + 1)) + this.min));
      this.state = "affame";
      this.startTimer()
      await this.eat();
    }
  }

  async eat() {
    if (this.state !== 'mort') {
      console.log(`${this.nom} is picking up forks`);
      await Promise.all([this.fourchetteGauche.acquire(), this.fourchetteDroite.acquire()]);
      console.log(`${this.nom} is eating`);
      this.state = "mange"
      this.pauseTimer()
      await new Promise(resolve => setTimeout(resolve, 30000)); // philosopher eats for 10 seconds
      console.log(`${this.nom} is putting down forks`);
      await Promise.all([this.fourchetteGauche.release(), this.fourchetteDroite.release()]);
    }
  }

  async dine() {
    while (true && this.state !== 'mort') {
      await this.penser();
    }
  }

}
