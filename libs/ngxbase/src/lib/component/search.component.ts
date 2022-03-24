import {Component, EventEmitter, Input, Output} from "@angular/core";

@Component({
  selector: 'lib-search',
  template: `
    <div class="lib-search">
      <div style="
margin: 20px auto;
text-align: center;
">
        <div style="
background-color: #fff;
border-radius: 24px;
display: flex;
flex-direction: row;
left: -8px;
overflow: hidden;
border: none;
box-shadow: 0 1px 3px rgb(60 63 66 / 32%), 0 4px 12px rgb(60 63 66 / 15%);
color: #80868b;
    transition: width 200ms ease,max-width 200ms ease,height 200ms ease,min-height 200ms ease,top 200ms ease,left 200ms ease,border 200ms ease,margin 200ms ease,padding 200ms ease,border-radius 100ms ease,background-color 400ms ease;
    ">
          <div style="
box-sizing: border-box;
overflow: hidden;
vertical-align: middle;
width: 100%;
height: 100%;
">
            <div style="
align-items: center;
display: inline-block;
height: 100%;
justify-content: center;
overflow: hidden;
position: relative;
vertical-align: middle;
width: 100%;
border-radius: 24px;
">
              <div style="
align-items: center;
display: flex;
flex-direction: row;
border-radius: 24px;
margin: 8px 14px;
transition: margin 200ms ease;
">

                <input style="
text-align: center;
outline: none;
border: 0;
box-sizing: border-box;
display: flex;
flex: 1 1 auto;
position: relative;
height: 24px;
width: 150px;
margin-left: 12px;
align-self: center;
overflow-x: hidden;
text-overflow: ellipsis;
vertical-align: middle;
white-space: nowrap;
font: 500 16px/20px Roboto,Arial,sans-serif;
" autocomplete="off" type="text"
                       [(ngModel)]="keyword"
                       (keydown.enter)="onSubmit()"
                       placeholder="搜索产品/百科">
                <svg (click)="onSubmit()" width="24" height="24" viewBox="0 0 24 24" focusable="false"
                     style="flex:none;width: 24px;">
                  <path
                    d="M20.49 19l-5.73-5.73C15.53 12.2 16 10.91 16 9.5A6.5 6.5 0 1 0 9.5 16c1.41 0 2.7-.47 3.77-1.24L19 20.49 20.49 19zM5 9.5C5 7.01 7.01 5 9.5 5S14 7.01 14 9.5 11.99 14 9.5 14 5 11.99 5 9.5z"></path>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`

  `]
})
export class LibSearchComponent {
  @Input() keyword = '';
  @Output() submit = new EventEmitter<string>();

  onSubmit() {
    this.submit.emit(this.keyword)
  }
}
