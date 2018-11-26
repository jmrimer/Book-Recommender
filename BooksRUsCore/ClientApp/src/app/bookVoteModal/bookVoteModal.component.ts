import {Component, ElementRef, Input, OnInit, OnDestroy} from '@angular/core';
import { Book } from "../book/Book";
import { ModalService } from "./bookVoteModal.service";

@Component({
  selector: 'app-bookVoteModal',
  templateUrl: './bookVoteModal.component.html',
  styleUrls: ['./bookVoteModal.component.css']
})
export class BookVoteModalComponent implements OnInit, OnDestroy {
  @Input() book: Book;
  @Input() id: string;
  private element: any;

  constructor(private modalService: ModalService, el: ElementRef) {
    this.element = el.nativeElement;
  }

  ngOnInit() {
    let modal = this;

    // ensure id attribute exists
    if (!this.id) {
      console.error('modal must have an id');
      return;
    }

    // move element to bottom of page (just before </body>) so it can be displayed above everything else
    document.body.appendChild(this.element);

    // close modal on background click
    this.element.addEventListener('click', function (e: any) {
      if (e.target.className === 'jw-modal') {
        modal.close();
      }
    });

    // add self (this modal instance) to the modal service so it's accessible from controllers
    this.modalService.add(this);
  }

  // remove self from modal service when directive is destroyed
  ngOnDestroy() {
    this.modalService.remove(this.id);
    this.element.remove();
  }

  // open modal
  open() {
    this.element.style.display = 'block';
    document.body.classList.add('jw-modal-open');
  }

  // close modal
  close() {
    this.element.style.display = 'none';
    document.body.classList.remove('jw-modal-open');
  }
}
