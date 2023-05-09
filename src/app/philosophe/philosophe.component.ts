import {Component, Input, OnInit} from '@angular/core';
import {Semaphore} from "../../utils/Semaphore";
import {PhilosopheObject} from "../../utils/PhilosopheObject";


@Component({
  selector: 'app-philosophe',
  templateUrl: './philosophe.component.html',
  styleUrls: ['./philosophe.component.scss']
})
export class PhilosopheComponent implements OnInit {

 @Input()
 philosophe?: PhilosopheObject;

  ngOnInit(): void {
  }

}
