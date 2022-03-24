import {Component, EventEmitter, HostListener, Inject, Input, OnInit, Optional, Output} from "@angular/core";
import {ImageViewerConfig} from "../model";

const DEFAULT_CONFIG: ImageViewerConfig = {
  btnClass: '',
  zoomFactor: 0.1,
  containerBackgroundColor: '#ccc',
  wheelZoom: false,
  allowFullscreen: true,
  allowKeyboardNavigation: true,
  btnShow: {
    zoomIn: true,
    zoomOut: true,
    rotateClockwise: true,
    rotateCounterClockwise: true,
    next: true,
    prev: true,
  },
  // btnIcons: {
  //   zoomIn: 'fa fa-plus',
  //   zoomOut: 'fa fa-minus',
  //   rotateClockwise: 'fa fa-repeat',
  //   rotateCounterClockwise: 'fa fa-undo',
  //   next: 'fa fa-arrow-right',
  //   prev: 'fa fa-arrow-left',
  //   fullscreen: 'fa fa-arrows-alt',
  // }
};

@Component({
  selector: 'lib-image-viewer',
  templateUrl: 'viewer.html',
  styleUrls: ['viewer.css']
})
export class ImageViewerComponent implements OnInit {
  @Input()
  src: string[] = new Array<string>();

  @Input()
  index = 0;

  @Input()
  config: ImageViewerConfig = DEFAULT_CONFIG;

  @Output()
  indexChange = new EventEmitter<number>();

  @Output()
  customEvent = new EventEmitter<CustomEvent>();

  @Output()
  configChange = new EventEmitter<ImageViewerConfig>();


  public style = {transform: '', msTransform: '', oTransform: '', webkitTransform: ''};
  public disabled = true;
  public loading = true;

  private scale = 1;
  private rotation = 0;
  private translateX = 0;
  private translateY = 0;
  private prevX: number = 0;
  private prevY: number = 0;
  private hovered = false;

  constructor(@Optional() @Inject('config') public moduleConfig: ImageViewerConfig) {
  }

  ngOnInit() {
    const merged = this.mergeConfig(DEFAULT_CONFIG, this.moduleConfig);
    this.config = this.mergeConfig(merged, this.config);
    this.triggerConfigBinding();
  }

  @HostListener('window:keyup.ArrowRight', ['$event'])
  nextImage(event: any) {
    if (this.canNavigate(event) && this.index < this.src.length - 1) {
      this.loading = true;
      this.index++;
      this.triggerIndexBinding();
      this.reset();
    }
  }

  @HostListener('window:keyup.ArrowLeft', ['$event'])
  prevImage(event: any) {
    if (this.canNavigate(event) && this.index > 0) {
      this.loading = true;
      this.index--;
      this.triggerIndexBinding();
      this.reset();
    }
  }

  zoomIn() {
    this.scale *= (1 + this.zoomFactor);
    this.updateStyle();
  }

  zoomOut() {
    if (this.scale > this.zoomFactor) {
      this.scale /= (1 + this.zoomFactor);
    }
    this.updateStyle();
  }

  get zoomFactor(): number {
    return this.config.zoomFactor || 0.1;
  }

  scrollZoom(evt: any) {
    if (this.config.wheelZoom) {
      evt.deltaY > 0 ? this.zoomOut() : this.zoomIn();
    }
  }

  rotateClockwise() {
    this.rotation += 90;
    this.updateStyle();
  }

  rotateCounterClockwise() {
    this.rotation -= 90;
    this.updateStyle();
  }

  onLoad() {
    this.loading = false;
  }

  onLoadStart() {
    this.loading = true;
  }

  onDragOver(evt: any) {
    this.translateX += (evt.clientX - this.prevX);
    this.translateY += (evt.clientY - this.prevY);
    this.prevX = evt.clientX;
    this.prevY = evt.clientY;
    this.updateStyle();
  }

  onDragStart(evt: any) {
    if (evt.dataTransfer && evt.dataTransfer.setDragImage) {
      evt.dataTransfer.setDragImage(evt.target.nextElementSibling, 0, 0);
    }
    this.prevX = evt.clientX;
    this.prevY = evt.clientY;
  }

  toggleFullscreen() {
    this.disabled = !this.disabled;
    if (this.disabled) {
      this.reset();
    }
  }

  triggerIndexBinding() {
    this.indexChange.emit(this.index);
  }

  triggerConfigBinding() {
    this.configChange.next(this.config);
  }

  fireCustomEvent(name: string, imageIndex: any) {
    this.customEvent.emit(new CustomEvent(name, imageIndex));
  }

  reset() {
    this.scale = 1;
    this.rotation = 0;
    this.translateX = 0;
    this.translateY = 0;
    this.updateStyle();
  }

  @HostListener('mouseover')
  private onMouseOver() {
    this.hovered = true;
  }

  @HostListener('mouseleave')
  private onMouseLeave() {
    this.hovered = false;
  }

  private canNavigate(event: any) {
    return event == null || (this.config.allowKeyboardNavigation && this.hovered);
  }

  private updateStyle() {
    this.style.transform = `translate(${this.translateX}px, ${this.translateY}px) rotate(${this.rotation}deg) scale(${this.scale})`;
    this.style.msTransform = this.style.transform;
    this.style.webkitTransform = this.style.transform;
    this.style.oTransform = this.style.transform;
  }

  private mergeConfig(defaultValues: ImageViewerConfig, overrideValues: ImageViewerConfig): ImageViewerConfig {
    let result: ImageViewerConfig = {...defaultValues};
    if (overrideValues) {
      result = {...defaultValues, ...overrideValues};
      //
      // if (overrideValues.btnIcons) {
      //   result.btnIcons = { ...defaultValues.btnIcons, ...overrideValues.btnIcons };
      // }
    }
    return result;
  }

}
