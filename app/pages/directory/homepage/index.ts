import { ViewChild, Component } from '@angular/core';
import { Platform, NavController, Searchbar } from 'ionic-angular';
// import { Content } from 'ionic-angular/index';
import { Subject, Subscription, Observable } from 'rxjs/Rx';
import { District, Category, Place, Tag} from '../../../models';
import { GetPlacesAction } from '../../../actions';
import { AppStore, PlaceStore, DistrictStore, CategoryStore, TagStore } from '../../../stores';
// import { IDiretoryFilter } from '../../../interfaces';
// import { DirectoryIndexFilterPage } from '../index/filter';
import { DirectoryShowPage } from '../show';
import { DirectoryIndexPage } from '../index';
// import { Keyboard } from 'ionic-native';
import * as _ from 'lodash';

@Component({
  templateUrl: 'build/pages/directory/homepage/index.html',
  providers: [GetPlacesAction],
})

export class DirectoryHomePage {
  public sliderOptions = {
    initialSlide: 0,
    autoHeight: true,
  };
  public places: Array<Place> = [];
  public featuredPlacesGroupedByBeaches: Array<Place> = [];
  public featuredPlacesGroupedByRestaurants: Array<Place> = [];
  public featuredPlacesGroupedByPlayrooms: Array<Place> = [];
  public featuredPlacesGroupedByPlaygrounds: Array<Place> = [];
  public featuredPlacesGroupedByEducation: Array<Place> = [];
  public featuredPlacesGroupedByActive: Array<Place> = [];
  public featuredPlacesGroupedByPools: Array<Place> = [];
  public featuredPlacesGroupedByShopping: Array<Place> = [];
  public featuredPlacesGroupedByLibraries: Array<Place> = [];
  public featuredPlacesGroupedByCulture: Array<Place> = [];
  public featuredPlacesGroupedByPrePostNatalServices: Array<Place> = [];
  public featuredPlacesGroupedByOutings: Array<Place> = [];
  public featuredPlacesGroupedByParksAndGardens: Array<Place> = [];
  public featuredPlacesGroupedByFamilyWalks: Array<Place> = [];
  public featuredPlacesGroupedByAttractions: Array<Place> = [];
  public featuredPlacesGroupedByMuseums: Array<Place> = [];

  private _placesSubscriptions: Subscription;

  constructor(
    private _nav: NavController,
    private _appStore: AppStore,
    private _platform: Platform,
    private _placeStore: PlaceStore,
    private _tagStore: TagStore,
    private _districtStore: DistrictStore,
    private _categoryStore: CategoryStore,
    private _getPlacesAction: GetPlacesAction
  ) {
  }

  ngOnInit() {
    console.debug('DirectoryHomePage OnInit');
    this._placesSubscriptions = this._setupDirectorySubscription();
    this._groupFeaturedBeaches();
    this._groupFeaturedRestaurants();
    this._groupFeaturedPlayrooms();
    this._groupFeaturedPlaygrounds();
    this._groupFeaturedEducation();
    this._groupFeaturedActive();
    this._groupFeaturedPools();
    this._groupFeaturedShopping();
    this._groupFeaturedLibraries();
    this._groupFeaturedCulture();
    this._groupFeaturedPrePostNatalServices();
    this._groupFeaturedOutings();
    this._groupFeaturedParksAndGardens();
    this._groupFeaturedFamilyWalks();
    this._groupFeaturedAttractions();
    this._groupFeaturedMuseums();
  }

  // ngAfterViewInit() {
  //
  // }

  ionViewWillEnter() {
    console.debug('DirectoryHomePage ionViewWillEnter');
  }

  ionViewDidEnter() {
    console.debug('DirectoryHomePage ionViewDidEnter');
  }

  ionViewWillLeave() {
    console.debug('DirectoryHomePage ionViewWillLeave');
  }

  ionViewDidUnload() {
    console.debug('DirectoryHomePage ionViewDidUnload');
    this._placesSubscriptions.unsubscribe();
  }

  ngOnDestroy() {
    console.debug('DirectoryHomePage ngOnDestroy');
  }

  public goToDirectoryShowPage(place) {
    this._nav.push(DirectoryShowPage, { place: place });
  }

  public handleListAllButtonClicked() {
    this._nav.push(DirectoryIndexPage);
  }

  private _groupFeaturedBeaches() {
    this.featuredPlacesGroupedByBeaches = _.filter(this.places, function (place) {
      return _.some(place.categories, {'title': 'Beaches'});
    });
  }

  private _groupFeaturedRestaurants() {
    this.featuredPlacesGroupedByRestaurants = _.filter(this.places, function (place) {
      return _.some(place.categories, {'title': 'Restaurants'});
    });
  }

  private _groupFeaturedPlayrooms() {
    this.featuredPlacesGroupedByPlayrooms = _.filter(this.places, function (place) {
      return _.some(place.categories, {'title': 'Playrooms'});
    });
  }

  private _groupFeaturedPlaygrounds() {
    this.featuredPlacesGroupedByPlaygrounds = _.filter(this.places, function (place) {
      return _.some(place.categories, {'title': 'Playgrounds'});
    });
  }

  private _groupFeaturedEducation() {
    this.featuredPlacesGroupedByEducation = _.filter(this.places, function (place) {
      return _.some(place.categories, {'title': 'Education'});
    });
  }

  private _groupFeaturedActive() {
    this.featuredPlacesGroupedByActive = _.filter(this.places, function (place) {
      return _.some(place.categories, {'title': 'Active'});
    });
  }

  private _groupFeaturedPools() {
    this.featuredPlacesGroupedByPools = _.filter(this.places, function (place) {
      return _.some(place.categories, {'title': 'Swimming Pools'});
    });
  }

  private _groupFeaturedShopping() {
    this.featuredPlacesGroupedByShopping = _.filter(this.places, function (place) {
      return _.some(place.categories, {'title': 'Shopping'});
    });
  }

  private _groupFeaturedLibraries() {
    this.featuredPlacesGroupedByLibraries = _.filter(this.places, function (place) {
      return _.some(place.categories, {'title': 'Libraries'});
    });
  }

  private _groupFeaturedCulture() {
    this.featuredPlacesGroupedByCulture = _.filter(this.places, function (place) {
      return _.some(place.categories, {'title': 'Culture'});
    });
  }

  private _groupFeaturedPrePostNatalServices() {
    this.featuredPlacesGroupedByPrePostNatalServices = _.filter(this.places, function (place) {
      return _.some(place.categories, {'title': 'Pre & Postnatal'});
    });
  }

  private _groupFeaturedOutings() {
    this.featuredPlacesGroupedByOutings = _.filter(this.places, function (place) {
      return _.some(place.categories, {'title': 'Outings'});
    });
  }

  private _groupFeaturedParksAndGardens() {
    this.featuredPlacesGroupedByParksAndGardens = _.filter(this.places, function (place) {
      return _.some(place.categories, {'title': 'Parks & Gardens'});
    });
  }

  private _groupFeaturedFamilyWalks() {
    this.featuredPlacesGroupedByFamilyWalks = _.filter(this.places, function (place) {
      return _.some(place.categories, {'title': 'Family Walks'});
    });
  }

  private _groupFeaturedAttractions() {
    this.featuredPlacesGroupedByAttractions = _.filter(this.places, function (place) {
      return _.some(place.categories, {'title': 'Attractions'});
    });
  }

  private _groupFeaturedMuseums() {
    this.featuredPlacesGroupedByMuseums = _.filter(this.places, function (place) {
      return _.some(place.categories, {'title': 'Museums'});
    });
  }



  private _setupDirectorySubscription(): Subscription {
    return this._placeStore.isFeaturedPlaces$.subscribe(
      (places: Array<Place>): void => {
        this.places = places;
        console.log('isFeatured Places', this.places);
      }
    );
  }

}
