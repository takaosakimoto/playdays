import { Component } from '@angular/core';
import { NavController, Modal } from 'ionic-angular';
import { Subscription } from 'rxjs/Rx';
import { District, Category, Tag } from '../../../models';
import { IDiretoryFilter, DiretoryFilter } from '../../../interfaces';
import { AppStore, DistrictStore, CategoryStore, TagStore } from '../../../stores';
import { DirectoryIndexFilterRegionPage } from './filter-region';
import InlineSVG from 'ng2-inline-svg';
import * as _ from 'lodash';

const isEqual = _.curry(_.isEqual);
const c = _.capitalize;

interface IdFilters {
  focused: Array<number>,
  selected: Array<number>
}

@Component({
  templateUrl: 'build/pages/directory/index/filter.html',
  directives: [ InlineSVG ],
})

export class DirectoryIndexFilterPage {
  public availableFilterTypes: string[] = ['district', 'category', 'tag'];


  public selectedDistrictFilters: Array<District> = [];
  public availableCategoryFilters: Array<Category> = [];
  public availableTagFilters: Array<Tag> = [];


  public filters: IDiretoryFilter = new DiretoryFilter();

  private _categoriesSubscription: Subscription;
  private _tagsSubscription: Subscription;

  private _diretoryFilterSubscriptions: Subscription;
  private diretoryFilter: IDiretoryFilter = null;

  constructor(
    private _nav: NavController,
    private _appStore: AppStore,
    private _districtStore: DistrictStore,
    private _tagStore: TagStore,
    private _categoryStore: CategoryStore
  ) {
    this._categoriesSubscription = this._setCategoriesSubscription();
    this._tagsSubscription = this._setTagsSubscription();
    this._diretoryFilterSubscriptions = this._setDiretoryFilterSubscriptions();
    this._updateSelectedDistrictFilters();
  }


  ionViewDidUnload() {
    console.debug('DirectoryFilterPage ionViewDidUnload');
    this._categoriesSubscription.unsubscribe();
    this._tagsSubscription.unsubscribe();
    this._diretoryFilterSubscriptions.unsubscribe();
  }

  private _handleFilterButtonClick(type:string, id: number) {
    const arr = this.filters[type].selected;
    this._appStore.update(
      this._newDiretoryFilter(
        [type,'selected'],
        _[_.includes(arr, id) ? 'without' : 'concat'](arr, id)
      )
    );
  }

  public handleCategoryFilterButtonClick(category: Category):void {
    this._handleFilterButtonClick('category', category.id)
  }

  public handleTagFilterButtonClick(tag: Tag):void {
    this._handleFilterButtonClick('tag', tag.id)
  }

  public handleResetButtonClicked() {
    this._resetSelectedFilters();
    this._nav.pop();
  }

  public handleDoneButtonClicked() {
    this._saveSelectedFilters();
    this._nav.pop({animate: true});
    console.log(this._nav);
  }

  public handleOpenFilterRegionPageModelButtonClicked() {
    const selectedDistrictFilterIds = _.clone(this.filters.district.selected);
    let modal = Modal.create(DirectoryIndexFilterRegionPage, {selectedDistrictIds: selectedDistrictFilterIds});

    modal.onDismiss((selectedDistrictFilterIds) => {
      if (selectedDistrictFilterIds !== undefined) {
        this.filters.district.selected = selectedDistrictFilterIds;
        this._updateSelectedDistrictFilters();
      }
    });
    this._nav.present(modal);
  }

  public handleRemoveDistrictFilterButtonClicked(districtId: number) {
    _.pull(this.filters.district.selected, districtId);
    _.pull(this.filters.district.focused, districtId);
    this._updateSelectedDistrictFilters();
  }

  private _setCategoriesSubscription(): Subscription {
    return this._categoryStore.categories$.subscribe(
      (categories: Array<Category>) => {
        this.availableCategoryFilters = categories;
      }
    );
  }
  private _setTagsSubscription(): Subscription {
    return this._tagStore.tags$.subscribe(
      (tags: Array<Tag>) => {
        this.availableTagFilters = tags;
      }
    );
  }

  private _setDiretoryFilterSubscriptions():Subscription {
    return this._appStore.diretoryFilter$.subscribe(
      (diretoryFilter: IDiretoryFilter) => {
        this.diretoryFilter = diretoryFilter;

        this.filters = diretoryFilter;
      }
    );
  }

  private _updateSelectedDistrictFilters() {
    let ids = _.clone(this.filters.district.selected);

    this._districtStore.districts$.first().subscribe(
      (districts: Array<District>) => {
        this.selectedDistrictFilters = _['intersectionWith'](districts, ids, (a, b) => a.id === b);
      }
    ).unsubscribe();
  }

  private _resetSelectedFilters() {
    this._appStore.update(
      _.reduce(
        this.availableFilterTypes,
        this._emptyFilters.bind(this),
        {diretoryFilter:this.diretoryFilter}
      )
    );
  }

  private _emptyFilters(acc:any, filterName:string):any {
    return _.reduce(
      ['focused','selected'],
      (acc:any, type:string) =>
        this._newDiretoryFilter([filterName,type], [], acc),
      acc
    )
  }

  private _saveSelectedFilters() {
    let focusedFiltersIds = _.reduce(
      <any>this.filters,
      (acc:any, filter:any, filterName:string) => _.merge(acc, {
        [filterName]: {
          selected: filter.selected,
          focused: _.intersection(filter.focused, filter.selected)
        }
      }),
      {}
    );
    this._appStore.update({diretoryFilter: focusedFiltersIds});
  }

  private _newDiretoryFilter(path:string[], value:any, diretoryFilter:any=null):{diretoryFilter:IDiretoryFilter} {
    if (this.diretoryFilter === null) return null;
    const t = diretoryFilter
      ? diretoryFilter.diretoryFilter
      : _.cloneDeep(this.diretoryFilter);
    return {diretoryFilter: <IDiretoryFilter>_.set(t, path, value)};
  }

}
