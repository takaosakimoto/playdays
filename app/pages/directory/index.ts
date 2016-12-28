import { ViewChild, Component } from '@angular/core';
import { VirtualScroll, Platform, NavController, Searchbar, Modal } from 'ionic-angular';
import { Content } from 'ionic-angular/index';
import { Subject, Subscription, Observable } from 'rxjs/Rx';
import { District, Category, Place, Tag} from '../../models';
import { AppStore, PlaceStore, DistrictStore, CategoryStore, TagStore } from '../../stores';
import { IDiretoryFilter } from '../../interfaces';
import { DirectoryIndexFilterPage } from './index/filter';
import { DirectoryShowPage } from './show';
import { Keyboard } from 'ionic-native';
import * as _ from 'lodash';

function filterIfIdIn(itemsWithId:{id:number}[], availableIds:number[]) {
  return _.filter(itemsWithId, ({id}) => _.includes(availableIds, id));
};

function filterPlacesIfAttrIdIn(places:Place[], attrName:string, ids:number[]) {
  if (ids.length === 0) return places;
  return _.filter(
    places,
    (place:Place):boolean =>
      _.intersection(_.map(place[attrName], 'id'), ids).length > 0
  );
};

function filterPlaces(places:Place[], filter:{[key:string]:number[]}):Place[] {
  return _.reduce(
    filter,
    (acc:Place[], ids:number[], filterName:string):Place[] =>
      filterPlacesIfAttrIdIn(acc, filterNameMap[filterName], ids),
    places
  )
};

function filterPlacesByName(places:Place[], searchString:string):Place[] {
  if (searchString === '') return places;
  const r = new RegExp(searchString, 'i');
  return _.filter(places, (place) => place.name.search(r) > -1);
};

const c = _.capitalize

const filterNameMap = {
  tag: 'tags',
  district: 'districts',
  category: 'categories'
}


@Component({
  templateUrl: 'build/pages/directory/index.html'
})

export class DirectoryIndexPage {
  // @ViewChild(Searchbar) searchbar: Searchbar;
  @ViewChild(VirtualScroll) virtualScroll: VirtualScroll;
  @ViewChild(Content) content: Content;
  public showSearchbar: boolean = false;
  public showPage: boolean = false;
  public searchbarDebounce: number = 250;
  public shouldHideSearchbarCancelButton: boolean = true;
  public searchInput$ = new Subject<string>();

  public filteredPlaces: Array<Place> = [];

  private _diretoryFilterSubscriptions: Subscription;
  private diretoryFilter: IDiretoryFilter = null;

  private _filteredPlacesSubscription: Subscription;

  private _filterStore: {
    District: DistrictStore,
    Category: CategoryStore
    Tag: TagStore
  }

  private _filterSubscriptions: Subscription;

  public focusedFilters: {
    District: Array<number>,
    Category: Array<number>,
    Tag: Array<number>,
  } = {District: [], Category: [], Tag: []}

  private selectedFilters: {
    District: Array<District>,
    Category: Array<Category>,
    Tag: Array<Tag>,
  } = {District: [], Category: [], Tag: []}

  constructor(
    private _nav: NavController,
    private _appStore: AppStore,
    private _platform: Platform,
    private _placeStore: PlaceStore,
    private _tagStore: TagStore,
    private _districtStore: DistrictStore,
    private _categoryStore: CategoryStore
  ) {
  }

  ngOnInit() {
    // this._nav.push(DirectoryIndexFilterPage);
    console.debug('DirectoryIndexPage OnInit');
    this._platform.ready().then(() => {
      Keyboard.disableScroll(true);
    });
    this._filterStore = {
      Tag: this._tagStore,
      District: this._districtStore,
      Category: this._categoryStore
    };
  }

  ngAfterViewInit() {
    this._diretoryFilterSubscriptions = this._setdiretoryFilterSubscriptions();
    this._filterSubscriptions = this._setFilterSubscriptions();
    this._filteredPlacesSubscription = this._setupFilteredPlacesSubscription();

    // this._appStore.hasVisitDiretoryFilerPage$.first().subscribe(
    //   (hasVisited: boolean) => {
    //
    //     if (!hasVisited) {
    //       this._nav.push(DirectoryIndexFilterPage, null, {animate: false}).then(() => {
    //         this._appStore.update({
    //           hasVisitDiretoryFilerPage: true
    //         });
    //         this.showPage = true
    //       });
    //     } else {
    //       this.showPage = true;
    //     }
    //   }
    // )
  }

  ionViewWillEnter() {
    console.debug('DirectoryIndexPage ionViewWillEnter');
    this.showSearchbar = true;
  }

  ionViewDidEnter() {
    console.debug('DirectoryIndexPage ionViewDidEnter');
  }

  ionViewWillLeave() {
    console.debug('DirectoryIndexPage ionViewWillLeave');
  }

  ionViewDidUnload() {
    console.debug('DirectoryIndexPage ionViewDidUnload');
    this._diretoryFilterSubscriptions.unsubscribe();
    this._filterSubscriptions.unsubscribe();
    this._filteredPlacesSubscription.unsubscribe();
  }

  ngOnDestroy() {
    if (this.virtualScroll && this.virtualScroll['_unreg']) {
      this.virtualScroll['_unreg']();
      this.virtualScroll['_unreg'] = null;
    }
  }

  public goToDirectoryShowPage(place) {
    this._nav.push(DirectoryShowPage, { place: place });
  }

  public handleFilterButtonClicked() {
    let modal = Modal.create(DirectoryIndexFilterPage);
    this._nav.present(modal, { animate: true });
    // this._nav.push(DirectoryIndexFilterPage);
  }

  // public handleOpenFilterRegionPageModelButtonClicked() {
  //   const selectedDistrictFilterIds = _.clone(this.filters.district.selected);
  //   let modal = Modal.create(DirectoryIndexFilterRegionPage, {selectedDistrictIds: selectedDistrictFilterIds});
  //
  //   modal.onDismiss((selectedDistrictFilterIds) => {
  //     if (selectedDistrictFilterIds !== undefined) {
  //       this.filters.district.selected = selectedDistrictFilterIds;
  //       this._updateSelectedDistrictFilters();
  //     }
  //   });
  //   this._nav.present(modal);
  // }

  public getPlacesHeader(record: Place, recordIndex: number, records: Array<Place>): string {
    let recordChar = record.name[0];
    let lastRecordChar = _.get(records, [recordIndex - 1, 'name', 0]);
    return lastRecordChar === recordChar ? null : recordChar.toUpperCase();
  }
  // some time the getPlacesHeader return a object instead of a string;
  public parseHeaderString(header: any) {
    if (typeof header === 'string') return header;
    if (typeof header.name === 'string') return ;
    return null;
  }

  public handleFocusFilterButtonClicked(type: string, id: number) {
    const arr = this.focusedFilters[c(type)];

    this._appStore.update(this._newDiretoryFilter(
      [type, 'focused'],
      _[_.includes(arr, id) ? 'without' : 'concat'](arr, id)
    ));
  }

  private handleRemoveFilterButtonClicked(type:string, id:number) {
    let t;
    t = this._newDiretoryFilter(
      [type, 'selected'],
      _.without(_.map(this.selectedFilters[c(type)], 'id'), id)
    );
    t = this._newDiretoryFilter(
      [type, 'focused'],
      _.without(this.focusedFilters[c(type)], id),
      t
    );
    this._appStore.update(t);
  }

  public handleRemoveDistrictFilterButtonClicked(districtId: number) {
    this.handleRemoveFilterButtonClicked('district', districtId);
  }

  public handleRemoveCategoryFilterButtonClicked(categoryId: number) {
    this.handleRemoveFilterButtonClicked('category', categoryId);
  }

  public handleRemoveTagFilterButtonClicked(categoryId: number) {
    this.handleRemoveFilterButtonClicked('tag', categoryId);
  }

  private _setFilterSubscriptions(): Subscription {
    return Observable.combineLatest(
      this._filterStore.District.state$,
      this._filterStore.Category.state$,
      this._filterStore.Tag.state$,
      this._appStore.diretoryFilter$,
      (districts:District[],categories:Category[],tags:Tag[],filters:IDiretoryFilter) => ({
        availableFilters: {District: districts, Category: categories, Tag: tags}, filters
      })
    ).subscribe(
      (combined:any) => {
        _.each(
          combined.filters,
          (idFilter:any, name:string):void => {
            this.focusedFilters[c(name)] = idFilter.focused;
          }
        );

        _.each(
          combined.filters,
          (idFilter:any, name:string):void => {
            this.selectedFilters[c(name)] =
            filterIfIdIn(
              combined.availableFilters[c(name)],
              idFilter.selected
            )
          }
        );
      }
    );
  }

  private _setupFilteredPlacesSubscription(): Subscription {
    // let searchbarInputSource = this.searchInput$.startWith(this.searchbar._value);
    let searchbarInputSource = this.searchInput$.startWith('');

    const filtersSource = Observable.combineLatest(
      this._appStore.diretoryFilter$,
      (filters:IDiretoryFilter):{[key:string]:number[]} =>
        _.reduce(
          filters,
          (acc:any, idFilter:any, key:string):any => _.merge(
            acc,
            {[key]: idFilter[idFilter.focused.length > 0 ?'focused':'selected']}
          ),
          {}
        )
    );

    let filteredPlacesSource;

    filteredPlacesSource = Observable.combineLatest(
      this._placeStore.places$, filtersSource, filterPlaces
    );

    filteredPlacesSource = Observable.combineLatest(
      filteredPlacesSource,
      searchbarInputSource,
      (places: Place[], searchText: string) =>
        filterPlacesByName(places, searchText)
    );

    return filteredPlacesSource.subscribe(
      (places: Array<Place>) => {
        this.filteredPlaces = places;
      }
    );
  }

  private _setdiretoryFilterSubscriptions():Subscription {
    return this._appStore.diretoryFilter$.subscribe(
      (diretoryFilter: IDiretoryFilter) => {
        this.diretoryFilter = diretoryFilter;
        console.log('diretoryFilter', this.diretoryFilter);
      }
    );
  }

  private _newDiretoryFilter(path:string[], value:any, diretoryFilter:any=null):{diretoryFilter:IDiretoryFilter} {
    if (this.diretoryFilter === null) return null;
    const t = diretoryFilter
      ? diretoryFilter.diretoryFilter
      : _.cloneDeep(this.diretoryFilter);
    return {diretoryFilter: <IDiretoryFilter>_.set(t, path, value)};
  }

}
