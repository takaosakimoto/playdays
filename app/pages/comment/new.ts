import { ViewChild, Component } from '@angular/core';
import { ViewController } from 'ionic-angular/index';
import { NavController, NavParams } from 'ionic-angular';
import { Observable, Subscription } from 'rxjs/Rx';
import { FormBuilder, AbstractControl, Validators, ControlGroup } from '@angular/common';
import { CreateCommentAction } from '../../actions';
import { ICreateCommentRequest } from '../../interfaces';
import { Comment } from '../../models';

@Component({
  templateUrl: 'build/pages/comment/new.html',
  providers: [CreateCommentAction],
  directives: []
})

export class NewCommentPage {
  isLoading: boolean = false;
  public commentForm: ControlGroup;
  public textContentInput: AbstractControl;
  public itemId: number;
  public itemType: string;
  private _commentFormSubmitSubscription: Subscription;
  private _meStoreSubscription: Subscription;

  constructor(
    private _nav: NavController,
    private _navParams: NavParams,
    private _viewCtrl: ViewController,
    private _formBuilder: FormBuilder,
    private _createCommentAction: CreateCommentAction
  ) {
  }

  ngOnInit() {
    console.debug('NewCommentPage ngOnInit');
    this._commentFormSubmitSubscription = this._setupForm();
    this.itemType = this._navParams.data.type;
    this.itemId = this._navParams.data.id;
  }

  ionViewDidLeave() {
    console.debug('NewCommentPage ionViewDidLeave');
  }

  ionViewDidUnload() {
    console.debug('NewCommentPage ionViewDidUnload');
    this._commentFormSubmitSubscription.unsubscribe();
  }

  ngOnDestroy() {
    console.debug('NewCommentPage ngOnDestroy');
  }

  public close() {
    this._viewCtrl.dismiss();
  }

  private _setupForm(): Subscription {
    this.commentForm = this._formBuilder.group({
      textContentInput: ['', Validators.required]
    });
    this.textContentInput = this.commentForm.controls['textContentInput'];

    let subscription = Observable.fromEvent(document.getElementById('comment-form'), 'submit')
      .debounceTime(500)
      .filter(r => this.commentForm.valid)
      .map((c): ICreateCommentRequest => {
        if ( this.itemType === 'place' ) {
          return {
            text_content: this.textContentInput.value,
            place_id: this.itemId
          };
        } else if ( this.itemType === 'event' ) {
          return {
            text_content: this.textContentInput.value,
            event_id: this.itemId
          };
        } else if ( this.itemType === 'trial_class' ) {
          return {
            text_content: this.textContentInput.value,
            trial_class_id: this.itemId
          };
        }
      })
      .do(() => this.isLoading = true )
      .switchMap(d =>
        this._createCommentAction.execute(d)
          .do(
            (comment: Comment): void => {
              this.isLoading = false;
              this._nav.pop();
            },
            (e): void => {
              this.isLoading = false;
              console.error('failed to create private event', e);
            }
          )
      )
      .subscribe();
    return subscription;
  }

}
