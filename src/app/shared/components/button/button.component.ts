import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas, IconName } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() buttonText?: string;
  @Input() iconName?: string;
  @Input() iconSrc?: string;
  @Input() type: 'button' | 'submit' | 'reset' = 'button';

  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }
  
  @Output() clicked = new EventEmitter<void>();

  onClick(): void {
    this.clicked.emit();
  }
}
