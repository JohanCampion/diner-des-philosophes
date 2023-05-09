import {Semaphore} from "./Semaphore";

export class PhilosopheObject {

  state: 'pense' | 'mange' = 'pense' ;

  tempPourPenser = 3000;
  tempPourManger = 10000;

  fourchetteGauche: Semaphore;
  fourchetteDroite: Semaphore;
  nom: String;

  pause = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

  min = 3000;
  max = 6000;



  constructor(nom: String, fourchetteGauche: Semaphore, fourchetteDroite: Semaphore) {
    this.fourchetteDroite = fourchetteDroite;
    this.fourchetteGauche = fourchetteGauche;
    this.nom = nom;
  }

  async penser() {
    this.state = "pense";
    console.log(`${this.nom} est entrain de penser`);
    await new Promise(resolve => setTimeout(resolve, Math.floor(Math.random() * (this.max - this.min + 1)) + this.min));
    await this.eat();
  }

  async eat() {
    console.log(`${this.nom} is picking up forks`);
    await Promise.all([this.fourchetteGauche.acquire(), this.fourchetteDroite.acquire()]);
    console.log(`${this.nom} is eating`);
    this.state = "mange"
    await new Promise(resolve => setTimeout(resolve, 3000)); // philosopher eats for 10 seconds
    console.log(`${this.nom} is putting down forks`);
    await Promise.all([this.fourchetteGauche.release(), this.fourchetteDroite.release()]);
  }

  async dine() {
    while (true) {
      await this.penser();
    }
  }

}
