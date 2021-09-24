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

        if ( counter === 2 ) {
          observer.complete();
        }

        if (counter > 3){
          observer.error(new Error('Count is greater than 3')); //error message in console and the script stops
        }
        counter ++;
      }, 1000)
    });

    this.firstObsSubscription = customIntervalObservable.subscribe(data =>{
      console.log(data);
    }, 
    //handling the error
    error => {
      console.log(error);
      alert(error.message);
    },
    //handling complete()
    () => {
      console.log('Completed!');
    }
    );

  }

  ngOnDestroy(): void {
    this.firstObsSubscription.unsubscribe();
  }

}
