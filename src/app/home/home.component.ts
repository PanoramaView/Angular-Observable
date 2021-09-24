import { Component, OnInit } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  private firstObsSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    
    // this.firstObsSubscription = interval(1000).subscribe(counter => {
    //   console.log(counter);
    // });

    const customIntervalObservable = Observable.create(observer => {
      let counter = 0;
      setInterval(() => {
        observer.next(counter); //to emit a new value
        counter ++;
      }, 1000)
    });

    this.firstObsSubscription = customIntervalObservable.subscribe(data =>{
      console.log(data);
    });

  }

  ngOnDestroy(): void {
    this.firstObsSubscription.unsubscribe();
  }

}
