import {Component} from '@angular/core';

@Component({
  selector: 'lib-loading',
  template: `
    <div class="lds-ripple">
      <div></div>
      <div></div>
    </div>`,
  styles: [`.lds-ripple {
    display: inline-block;
    position: relative;
    width: 40px;
    height: 40px;
  }

  .lds-ripple div {
    position: absolute;
    border: 4px solid #3f51b5;
    opacity: 1;
    border-radius: 50%;
    animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  }

  .lds-ripple div:nth-child(2) {
    animation-delay: -0.5s;
  }

  @keyframes lds-ripple {
    0% {
      top: 20px;
      left: 20px;
      width: 0;
      height: 0;
      opacity: 1;
    }
    100% {
      top: 0px;
      left: 0px;
      width: 40px;
      height: 40px;
      opacity: 0;
    }
  }
  `]
})
export class LibLoadingComponent {

}
