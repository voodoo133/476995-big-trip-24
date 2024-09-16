import AbstractView from '../framework/view/abstract-view';

function createSortListItemTemplate() {
  return `<div class="trip-sort__item  trip-sort__item--day">
            <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day" checked>
            <label class="trip-sort__btn" for="sort-day">Day</label>
          </div>`;
}

export default class SortListItemView extends AbstractView {
  get template() {
    return createSortListItemTemplate();
  }
}
