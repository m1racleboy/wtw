import React from 'react';
import Logo from '../logo/logo';

export default function AddReviewScreen() {
  return (
    <>
      <section class="film-card film-card--full">
        <div class="film-card__header">
          <div class="film-card__bg">
            <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel" />
          </div>

          <h1 class="visually-hidden">WTW</h1>

          <header class="page-header">
            <Logo />

            <nav class="breadcrumbs">
              <ul class="breadcrumbs__list">
                <li class="breadcrumbs__item">
                  <a href="film-page.html" class="breadcrumbs__link">The Grand Budapest Hotel</a>
                </li>
                <li class="breadcrumbs__item">
                  <a class="breadcrumbs__link">Add review</a>
                </li>
              </ul>
            </nav>

            <ul class="user-block">
              <li class="user-block__item">
                <div class="user-block__avatar">
                  <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
                </div>
              </li>
              <li class="user-block__item">
                <a class="user-block__link">Sign out</a>
              </li>
            </ul>
          </header>

          <div class="film-card__poster film-card__poster--small">
            <img src="img/the-grand-budapest-hotel-poster.jpg" alt="The Grand Budapest Hotel poster" width="218" height="327" />
          </div>
        </div>

        <div class="add-review">
          <form action="#" class="add-review__form">
            <div class="rating">
              <div class="rating__stars">
                <input class="rating__input" id="star-10" type="radio" name="rating" value="10" />
                <label class="rating__label" htmlFor="star-10">Rating 10</label>

                <input class="rating__input" id="star-9" type="radio" name="rating" value="9" />
                <label class="rating__label" htmlFor="star-9">Rating 9</label>

                <input class="rating__input" id="star-8" type="radio" name="rating" value="8" checked />
                <label class="rating__label" htmlFor="star-8">Rating 8</label>

                <input class="rating__input" id="star-7" type="radio" name="rating" value="7" />
                <label class="rating__label" htmlFor="star-7">Rating 7</label>

                <input class="rating__input" id="star-6" type="radio" name="rating" value="6" />
                <label class="rating__label" htmlFor="star-6">Rating 6</label>

                <input class="rating__input" id="star-5" type="radio" name="rating" value="5" />
                <label class="rating__label" htmlFor="star-5">Rating 5</label>

                <input class="rating__input" id="star-4" type="radio" name="rating" value="4" />
                <label class="rating__label" htmlFor="star-4">Rating 4</label>

                <input class="rating__input" id="star-3" type="radio" name="rating" value="3" />
                <label class="rating__label" htmlFor="star-3">Rating 3</label>

                <input class="rating__input" id="star-2" type="radio" name="rating" value="2" />
                <label class="rating__label" htmlFor="star-2">Rating 2</label>

                <input class="rating__input" id="star-1" type="radio" name="rating" value="1" />
                <label class="rating__label" htmlFor="star-1">Rating 1</label>
              </div>
            </div>

            <div class="add-review__text">
              <textarea class="add-review__textarea" name="review-text" id="review-text" placeholder="Review text"></textarea>
              <div class="add-review__submit">
                <button class="add-review__btn" type="submit">Post</button>
              </div>

            </div>
          </form>
        </div>

      </section>
    </>
  );
}
