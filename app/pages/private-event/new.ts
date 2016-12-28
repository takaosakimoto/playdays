import { Component, NgZone } from  '@angular/core';
import { FormBuilder, AbstractControl, Validators, ControlGroup, FORM_PROVIDERS, FORM_DIRECTIVES } from '@angular/common';
import { NavController, NavParams, Modal, Alert } from 'ionic-angular';
import { DatePicker } from 'ionic-native';
import { Observable, Subscription } from 'rxjs/Rx';
import { ICreatePrivateEventRequest } from '../../interfaces';
import { Place, PrivateEvent } from '../../models';
import { PrivateEventInviteFriendPage } from './invite';
import { CreatePrivateEventAction } from '../../actions';
import { PlaceItemComponent } from '../../components';
import { Toast } from '../../utils/toast';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
  templateUrl: 'build/pages/private-event/new.html',
  providers: [FORM_PROVIDERS, CreatePrivateEventAction],
  directives: [
    ...FORM_DIRECTIVES,
    PlaceItemComponent,
  ],
})

export class PrivateEventNewPage {
  isLoading: boolean = false;
  public place: Place;
  public privateEventForm: ControlGroup;
  public eventNameInput: AbstractControl;
  public datetimeInput: AbstractControl;
  private invitedFriendIds: Array<number> = [];
  private _privateEventFormSubmitSubscription: Subscription;

  constructor(
    private _ngZone: NgZone,
    private _nav: NavController,
    private _navParams: NavParams,
    private _toast: Toast,
    private _formBuilder: FormBuilder,
    private _createPrivateEventAction: CreatePrivateEventAction
  ) {
    this.place = this._navParams.data.place;
  }

  ngOnInit(): void {
    console.debug('PrivateEventNewPage OnInit');
    this._privateEventFormSubmitSubscription = this._setupForm();
  }

  ionViewDidunload() {
    console.debug('PrivateEventNewPage ionViewDidunload');
    this._privateEventFormSubmitSubscription.unsubscribe();
  }

  public openDateTimePicker() {
    DatePicker.show({
      date: new Date(),
      mode: 'datetime',
      allowOldDate: false
    })
    .then(
      time => {
        this._ngZone.run(() => {
          this.datetimeInput['updateValue'](time);
        });
      },
      err => console.log('Error occurred while getting date:', err)
    );
  }

  public dateFormat(date: Date): string {
    // console.log('steve');
    // console.log(date);
    if ( date ) {
      return moment(date).format('YYYY-MM-DD hh:mm A');
    }else {
      return 'Pick a Time';
    }

  }

  public handleOpenInviteFriendsModalButtonClicked() {
    const selectedFriendIds = _.clone(this.invitedFriendIds);
    let modal = Modal.create(PrivateEventInviteFriendPage, {selectedFriendIds: selectedFriendIds});
    modal.onDismiss((selectedFriendIds) => {
      if (selectedFriendIds !== undefined) {
        this.invitedFriendIds = selectedFriendIds;
      }
      console.log(this.invitedFriendIds);
    });
    this._nav.present(modal);
  }

  private _setupForm(): Subscription {
    this.privateEventForm = this._formBuilder.group({
      eventNameInput: ['', Validators.required],
      datetimeInput: ['', Validators.required]
    });
    this.eventNameInput = this.privateEventForm.controls['eventNameInput'];
    this.datetimeInput = this.privateEventForm.controls['datetimeInput'];

    let subscription = Observable.fromEvent(document.getElementById('private-event-form'), 'submit')
      .debounceTime(500)
      .filter(r => this.privateEventForm.valid)
      .map((c): ICreatePrivateEventRequest => {
        let date = new Date(this.datetimeInput.value);
        return {
          name: this.eventNameInput.value,
          date: date.getTime(),
          from: date.getTime(),
          place_id: this.place.id,
          invited_consumer_ids: this.invitedFriendIds
        };
      })
      .do(() => this.isLoading = true )
      .switchMap(d =>
        this._createPrivateEventAction.execute(d)
          .do(
            (pe: PrivateEvent): void => {
              this.isLoading = false;
              this._nav.pop();
              this._toast.create('You have joined this event.');
            },
            (e): void => {
              this.isLoading = false;
              this._showCreateSessionErrorAlert();
              console.error('failed to create private event', e);
            }
          )
      )
      .subscribe();
    return subscription;
  }

  private _showCreateSessionErrorAlert() {
    let alert = Alert.create({
      title: 'failed to create private event',
      message: 'Try Again',
      enableBackdropDismiss: false
    });
    this._nav.present(alert);

    setTimeout(() => {
      alert.dismiss();
    }, 1500);
  }

}
