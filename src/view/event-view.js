import AbstractView from '../framework/view/abstract-view';
import { formatDate, getEventDuration } from '../utils/general.js';
import { DateFormat } from '../constants.js';

function makeOffersListHtml(type, selectedOffers, allOffers) {
  const offersList = allOffers
    .find((offer) => offer.type === type)
    .offers
    .filter((offer) => selectedOffers.includes(offer.id));

  return offersList.map((offer) =>
    `<li class="event__offer">
      <span class="event__offer-title">${offer.title}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer.price}</span>
    </li>`
  ).join('');
}

function createEventTemplate(event, allDestinations, allOffers) {
  const { dateFrom, dateTo, type, destination, basePrice, isFavorite, offers } = event;

  const destinationData = allDestinations.find((dest) => dest.id === destination);
  const eventDate = formatDate(dateFrom, DateFormat.EVENT_DATE);
  const eventTimeFrom = formatDate(dateFrom, DateFormat.EVENT_TIME);
  const eventTimeTo = formatDate(dateTo, DateFormat.EVENT_TIME);
  const eventDuration = getEventDuration(dateFrom, dateTo);
  const offersListHtml = makeOffersListHtml(type, offers, allOffers);

  return `<div class="event">
            <time class="event__date" datetime="${dateFrom}">${eventDate}</time>
            <div class="event__type">
                <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
            </div>
            <h3 class="event__title">${type} ${destinationData.name}</h3>
            <div class="event__schedule">
                <p class="event__time">
                <time class="event__start-time" datetime="${dateFrom}">${eventTimeFrom}</time>
                &mdash;
                <time class="event__end-time" datetime="${dateTo}">${eventTimeTo}</time>
                </p>
                <p class="event__duration">${eventDuration}</p>
            </div>
            <p class="event__price">
                &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
            </p>
            <h4 class="visually-hidden">Offers:</h4>
            <ul class="event__selected-offers">
                ${offersListHtml}
            </ul>
            <button class="event__favorite-btn ${isFavorite ? 'event__favorite-btn--active' : ''}" type="button">
                <span class="visually-hidden">Add to favorite</span>
                <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                </svg>
            </button>
            <button class="event__rollup-btn" type="button">
                <span class="visually-hidden">Open event</span>
            </button>
          </div>`;
}

export default class EventView extends AbstractView {
  #event = null;
  #allDestinations = [];
  #allOffers = [];
  #handleEditClick = null;
  #handleFavoriteBtnClick = null;

  constructor(event, allDestinations, allOffers, onEditClick, onFavoriteBtnClick) {
    super();

    this.#event = event;
    this.#allDestinations = allDestinations;
    this.#allOffers = allOffers;
    this.#handleEditClick = onEditClick;
    this.#handleFavoriteBtnClick = onFavoriteBtnClick;
    this.element.querySelector('.event__rollup-btn')
      .addEventListener('click', this.#editClickHandler);
    this.element.querySelector('.event__favorite-btn')
      .addEventListener('click', this.#favoriteBtnClickHandler);
  }

  get template() {
    return createEventTemplate(this.#event, this.#allDestinations, this.#allOffers);
  }

  #favoriteBtnClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleFavoriteBtnClick();
  };

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleEditClick();
  };
}
